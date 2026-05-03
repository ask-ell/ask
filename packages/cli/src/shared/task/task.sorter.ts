import { MaybeUndefined } from "@ask-ell/core";

import { Id, IProjectDTO, IProjectConfigurationDTO, ITaskDTO } from "@ask/back-end-api";


type GetUniqueTasksDTO = {
    project: IProjectDTO;
    projectConfiguration: IProjectConfigurationDTO;
}

export class TaskSorter {
    getUniqueTasks({ project, projectConfiguration }: GetUniqueTasksDTO): ITaskDTO[] {
        const tasks: Map<Id, ITaskDTO> = new Map();

        project.tasks?.forEach((task: ITaskDTO): void => {
            task.description = `${task.description} <- *`;
            tasks.set(task.id, task);
        });
    
        projectConfiguration.tasks?.forEach((task: ITaskDTO): void => {
            task.description = `${task.description} <- ${projectConfiguration.id}`;
            tasks.set(task.id, task);
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