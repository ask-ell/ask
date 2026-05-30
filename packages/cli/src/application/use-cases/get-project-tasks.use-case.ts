import { MaybeUndefined } from "@ask-ell/core";

import { IProjectConfigurationPartialState } from "../domain/entities/project/project-configuration.partial.state";
import { IProjectState } from "../domain/entities/project/project.state.interface";
import { ITaskState } from "../domain/entities/task/task.state.interface";
import { IGetProjectTasksUseCase } from "../ports/driving/use-cases/project-configuration/get-project-tasks.use-case.interface";
import { IUnitOfWork } from "../unit-of-work/unit-of-work.interface";
import { IProjectConfigurationState } from "../domain/entities/project-configuration/project-configuration.state.interface";


export class GetProjectTasksUseCase implements IGetProjectTasksUseCase {
    constructor(
        private unitOfWork: IUnitOfWork
    ){}

    async run(project: IProjectState): Promise<ITaskState[]> {
        await Promise.resolve();

        const tasks: ITaskState[] = [
            ...project.tasks || []
        ];

        if(project.extends?.length) {
            await Promise.all(project.extends.map(async (projectConfigurationPartialState: IProjectConfigurationPartialState): Promise<void> => {
                const projectConfiguration: MaybeUndefined<IProjectConfigurationState> = await this.unitOfWork
                    .getProjectConfigurationProvider()
                    .findOneFromPartialState(projectConfigurationPartialState);

                if(projectConfiguration?.tasks?.length) {
                    tasks.push(...projectConfiguration.tasks);
                }
            }));
        }

        return tasks;
    }
}
