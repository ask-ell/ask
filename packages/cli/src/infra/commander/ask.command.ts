import { Command } from "commander";

import { ITask } from "../../shared/types";
import { TaskRunner } from "../../shared/task.runner";


export class AskCommand extends Command {
    constructor(
        tasks: ITask[]
    ) {
        super('ask');
        tasks.forEach((task: ITask): void => {
            const taskRunner: TaskRunner = new TaskRunner(task);
            this.command(task.id)
                .description(task.description)
                .action(taskRunner.run.bind(taskRunner));
        });
    }
}
