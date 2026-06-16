import { ILogger } from "@ask-ell/core";
import { homedir } from "os";
import { join } from "path";
import { Command } from "commander";

import { GetProjectConfigurationUseCaseFactory, GetProjectTasksUseCaseFactory, UserConfigurationFactory } from "../../../shared/factories";
import { RootOptions } from "../../../shared/options";
import { CleanCommand } from "./clean.command";
import { RunCommand } from "./run.command";
import { PullCommand } from "./pull.command";
import { ListCommand } from "./list.command";
import { LoginCommand } from "./login.command";


type AskCommandProps = {
    logger: ILogger,
    getProjectTasksUseCaseFactory: GetProjectTasksUseCaseFactory,
    getProjectConfigurationUseCaseFactory: GetProjectConfigurationUseCaseFactory,
    userConfigurationFactory: UserConfigurationFactory
};

export class AskCommand extends Command {
    constructor({
        logger,
        getProjectTasksUseCaseFactory,
        getProjectConfigurationUseCaseFactory,
        userConfigurationFactory
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
            new ListCommand(logger, getProjectTasksUseCaseFactory)
        );
        this.addCommand(
            new PullCommand(logger, getProjectConfigurationUseCaseFactory, userConfigurationFactory)
        );
        this.addCommand(
            new RunCommand(logger, getProjectTasksUseCaseFactory)
        );
        this.addCommand(
            new LoginCommand(logger, userConfigurationFactory)
        );
    }

    getRootOptions(): RootOptions {
        return this.opts();
    }
}
