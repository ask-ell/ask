import { Command } from "commander";

import { Id, IProject, IProjectConfiguration, ITask } from "./types";
import { askProject, nxProjectConfiguration } from "./data";
import { TaskRunner } from "./task.runner";


export class AskCommand extends Command {
    constructor() {
        super('ask');
    }

    async run(): Promise<void> {
        const tasks: Map<Id, ITask> = new Map();
    
        // TODO: fetch from server
        const project: IProject = await Promise.resolve(askProject);
        const projectConfiguration: IProjectConfiguration = await Promise.resolve(nxProjectConfiguration);
    
        project.tasks?.forEach((task: ITask): void => {
            task.description = `${task.description} <- *`;
            tasks.set(task.id, task);
        });
    
        projectConfiguration.tasks?.forEach((task: ITask): void => {
            task.description = `${task.description} <- ${projectConfiguration.id}`;
            tasks.set(task.id, task);
        });
    
        tasks.forEach((task: ITask): void => {
            // TODO: manage "pre" hook
            if(task.id.includes('post:')) {
                const previousTaskId: Id = task.id.split('post:')[1];
                tasks.get(previousTaskId)?.instructions.push(...task.instructions);
            }
        });
    
        tasks.forEach((task: ITask): void => {
            const taskRunner: TaskRunner = new TaskRunner(task);
            this.command(task.id)
                .description(task.description)
                .action(taskRunner.run.bind(taskRunner));
        });

        this.parse();
    }
}
