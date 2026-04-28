import { Command } from "commander";

import { ITaskDTO } from "@ask-ell/ask-back-end-api";

import { TaskRunner } from "../../shared/task.runner";


export class AskCommand extends Command {
    constructor(
        tasks: ITaskDTO[]
    ) {
        super('ask');
        tasks.forEach((task: ITaskDTO): void => {
            const taskRunner: TaskRunner = new TaskRunner(task);
            this.command(task.id)
                .description(task.description)
                .action(taskRunner.run.bind(taskRunner));
        });
    }
}
