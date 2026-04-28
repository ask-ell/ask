import { Command } from "commander";

import { ITaskDTO } from "@ask-ell/back-end-api";

import { RootOptions } from "./types";
import { TaskRunner } from "../../shared/task.runner";


export class AskCommand extends Command {
    private runCommand: Command = new Command('run').description('run a task').allowUnknownOption(true);

    constructor() {
        super('ask');
        this.option('-s, --storage [PATH]', 'Path to the storage directory', '$HOME/.ask'); // TODO: make creating it in home directory
        this.addCommand(this.runCommand);
    }

    setTasks(tasks: ITaskDTO[]): void {
         tasks.forEach((task: ITaskDTO): void => {
            const taskRunner: TaskRunner = new TaskRunner(task);
            this.runCommand.command(task.id)
                .description(task.description)
                .action(taskRunner.run.bind(taskRunner));
        });
    }

    getRootOptions(): RootOptions {
        return this.opts();
    }
}
