import { MaybeUndefined } from "@ask-ell/core";

import { Id, IProjectDTO, IProjectConfigurationDTO, ITaskDTO } from "@ask-ell/back-end-api";


export class TaskSorter {
    constructor(
        private project: IProjectDTO,
        private projectConfiguration: IProjectConfigurationDTO
    ){}
    
    getUniqueTasks(): ITaskDTO[] {
        const tasks: Map<Id, ITaskDTO> = new Map();

        this.project.tasks?.forEach((task: ITaskDTO): void => {
            task.description = `${task.description} <- *`;
            tasks.set(task.id, task);
        });
    
        this.projectConfiguration.tasks?.forEach((task: ITaskDTO): void => {
            task.description = `${task.description} <- ${this.projectConfiguration.id}`;
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