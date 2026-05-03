import { MaybeUndefined } from "@ask-ell/core";

import { Id, IProjectDTO, IProjectConfigurationDTO, ITaskDTO } from "@ask/back-end-api";
import { addStyleToDescription } from "./utils";


type GetUniqueTasksDTO = {
    project: IProjectDTO;
    projectConfigurations?: IProjectConfigurationDTO[];
}

export class TaskSorter {
    getUniqueTasks({ project, projectConfigurations }: GetUniqueTasksDTO): ITaskDTO[] {
        const tasks: Map<Id, ITaskDTO> = new Map();

        project.tasks?.forEach((task: ITaskDTO): void => {
            task.description = addStyleToDescription(task);
            tasks.set(task.id, task);
        });
    
        projectConfigurations?.forEach((projectConfiguration: IProjectConfigurationDTO): void => {
            projectConfiguration.tasks?.forEach((task: ITaskDTO): void => {
                task.description = addStyleToDescription(task);
                tasks.set(task.id, task);
            });
        });
    
        tasks.forEach((task: ITaskDTO): void => {
            if(task.id.includes('pre:')) {
                const nextTaskId: Id = task.id.split('pre:')[1];
                const nextTask: MaybeUndefined<ITaskDTO> = tasks.get(nextTaskId);
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