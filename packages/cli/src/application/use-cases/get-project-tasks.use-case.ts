import { MaybeUndefined } from "@ask-ell/core";
import { Id } from "@ask-ell/core/dist/src/ddd";

import { IProjectConfigurationPartialState } from "../domain/entities/project/project-configuration.partial.state";
import { IProjectState } from "../domain/entities/project/project.state.interface";
import { ITaskState } from "../domain/entities/task/task.state.interface";
import { IGetProjectTasksUseCase } from "../ports/driving/use-cases/project-configuration/get-project-tasks.use-case.interface";
import { IUnitOfWork } from "../unit-of-work/unit-of-work.interface";
import { IProjectConfigurationState } from "../domain/entities/project-configuration/project-configuration.state.interface";
import { RunnableTask } from "../ports/driving/use-cases/project-configuration/types";


export class GetProjectTasksUseCase implements IGetProjectTasksUseCase {
    constructor(
        private unitOfWork: IUnitOfWork
    ){}

    async run(project: IProjectState): Promise<RunnableTask[]> {
        await Promise.resolve();

        const tasks: Map<Id, RunnableTask> = new Map();

        project.tasks?.forEach((task: ITaskState): void => {
            tasks.set(task.id, task);
        });

        if(project.extends?.length) {
            await Promise.all(project.extends.map(async (projectConfigurationPartialState: IProjectConfigurationPartialState): Promise<void> => {
                const projectConfiguration: MaybeUndefined<IProjectConfigurationState> = await this.unitOfWork
                    .getProjectConfigurationProvider()
                    .findOneFromPartialState(projectConfigurationPartialState);
                projectConfiguration?.tasks?.forEach((task: ITaskState): void => {
                    tasks.set(task.id, {
                        ...task,
                        origin: projectConfiguration
                    });
                });
            }));
        }

        tasks.forEach((task: RunnableTask): void => {
            if(task.id.includes('pre:')) {
                const nextTaskId: Id = task.id.split('pre:')[1];
                const nextTask: MaybeUndefined<RunnableTask> = tasks.get(nextTaskId);
                if(nextTask) {
                    nextTask.instructions = [...task.instructions, ...nextTask.instructions];
                    tasks.set(nextTaskId, nextTask);
                }
                return;
            }
    
            if(task.id.includes('post:')) {
                const previousTaskId: Id = task.id.split('post:')[1];
                tasks.get(previousTaskId)?.instructions.push(...task.instructions);
            }
        });

        return Array.from(tasks.values());
    }
}
