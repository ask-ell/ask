import { Command } from "commander";
import { MaybeUndefined } from "@ask-ell/core";

import { Id, IProject, IProjectConfiguration, ITask } from "../../shared/types";
import { askProject, nxProjectConfiguration } from "../../shared/data";
import { TaskRunner } from "../../shared/task.runner";


export class AskCommand extends Command {
    private tasks: Map<Id, ITask> = new Map();

    constructor() {
        super('ask');
    }

    async run(): Promise<void> {
        // TODO: fetch from server
        const project: IProject = await Promise.resolve(askProject);
        const projectConfiguration: IProjectConfiguration = await Promise.resolve(nxProjectConfiguration);
    
        project.tasks?.forEach((task: ITask): void => {
            task.description = `${task.description} <- *`;
            this.tasks.set(task.id, task);
        });
    
        projectConfiguration.tasks?.forEach((task: ITask): void => {
            task.description = `${task.description} <- ${projectConfiguration.id}`;
            this.tasks.set(task.id, task);
        });
    
        this.tasks.forEach((task: ITask): void => {
            if(task.id.includes('pre:')) {
                const nextTaskId: Id = task.id.split('pre:')[1];
                const nextTask: MaybeUndefined<ITask> = this.tasks.get(nextTaskId);
                if(nextTask) {
                    nextTask.instructions = [...task.instructions, ...nextTask.instructions];
                    this.tasks.set(nextTaskId, nextTask);
                }
                return;
            }
            if(task.id.includes('post:')) {
                const previousTaskId: Id = task.id.split('post:')[1];
                this.tasks.get(previousTaskId)?.instructions.push(...task.instructions);
            }
        });
    
        this.tasks.forEach((task: ITask): void => {
            const taskRunner: TaskRunner = new TaskRunner(task);
            this.command(task.id)
                .description(task.description)
                .action(taskRunner.run.bind(taskRunner));
        });

        this.parse();
    }
}
