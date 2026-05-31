import { ILogger } from "@ask-ell/core";
import { homedir } from "os";
import { join } from "path";
import { Command } from "commander";

import { RunnableTask } from '../../../application';
import { addStyleToDescription, runTask, TaskRunner } from "../../../shared/task";

import { RootOptions } from "../types";
import { CleanCommand } from "./clean.command";
import { RunCommand } from "./run.command";
import { TaskCommand } from "./task.command";


export class AskCommand extends Command {
    constructor(
        private logger: ILogger
    ) {
        super('ask');
        this
            .option('-s, --storage [PATH]', 'storage directory path', join(homedir(), '.ask'))
            .option('-r, --remote [URL]', 'remote URL')
            .option('-l, --log [LEVEL]', 'logger level')
            .allowExcessArguments()
            .parse(process.argv)
            .addCommand(
                new CleanCommand(
                    logger,
                    this.opts()
                )
            );
    }

    setTasks(tasks: RunnableTask[]): this {
        const runCommand: RunCommand = new RunCommand();

        tasks.forEach((task: RunnableTask): void => {
            task.description = addStyleToDescription(task);
            const taskRunner: TaskRunner = runTask(this.logger);

            runCommand.addCommand(
                new TaskCommand(task)
                    .setTaskRunner(taskRunner)
            );
        });
    
        this.addCommand(runCommand);
        return this;
    }

    getRootOptions(): RootOptions {
        return this.opts();
    }
}
