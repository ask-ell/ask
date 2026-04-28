import { MaybeUndefined } from "@ask-ell/core";

import { Id, IProject, IProjectConfiguration, ITask } from "./types";


export class TaskSorter {
    constructor(
        private project: IProject,
        private projectConfiguration: IProjectConfiguration
    ){}
    
    getUniqueTasks(): ITask[] {
        const tasks: Map<Id, ITask> = new Map();

        this.project.tasks?.forEach((task: ITask): void => {
            task.description = `${task.description} <- *`;
            tasks.set(task.id, task);
        });
    
        this.projectConfiguration.tasks?.forEach((task: ITask): void => {
            task.description = `${task.description} <- ${this.projectConfiguration.id}`;
            tasks.set(task.id, task);
        });
    
        tasks.forEach((task: ITask): void => {
            if(task.id.includes('pre:')) {
                const nextTaskId: Id = task.id.split('pre:')[1];
                const nextTask: MaybeUndefined<ITask> = tasks.get(nextTaskId);
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