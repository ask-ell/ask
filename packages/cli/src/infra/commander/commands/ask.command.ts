import { ILogger } from "@ask-ell/core";
import { homedir } from "os";
import { join } from "path";
import { Command } from "commander";

import { IGetProjectTasksUseCase } from '../../../application';

import { RootOptions } from "../../../shared/options";
import { CleanCommand } from "./clean.command";
import { RunCommand } from "./run.command";
import { PullCommand } from "./pull.command";


type AskCommandProps = {
    logger: ILogger,
    getProjectTasksUseCaseFactory: (rootOptions: RootOptions) => IGetProjectTasksUseCase,
};

export class AskCommand extends Command {
    constructor({
        logger,
        getProjectTasksUseCaseFactory
    }: AskCommandProps) {
        super('ask');
        this
            .option('-s, --storage [PATH]', 'storage directory path', join(homedir(), '.ask'))
            .option('-r, --remote [URL]', 'remote URL')
            .option('-l, --log [LEVEL]', 'logger level')
        this.addCommand(
            new CleanCommand(logger)
        );
        this.addCommand(
            new RunCommand(logger, getProjectTasksUseCaseFactory)
        );
        this.addCommand(
            new PullCommand(logger)
        );
    }

    getRootOptions(): RootOptions {
        return this.opts();
    }
}
