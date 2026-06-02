import { ILogger } from '@ask-ell/core';

import { AskCommand } from '../commander';
import { SignaleLogger } from '../signale';
import { getProjectTasksUseCaseFactory, getProjectConfigurationUseCaseFactory, userConfigurationFactory } from './providers';


const tryAndCatch = (logger: ILogger) => (action: () => void): void => {
    try {
        action();
    } catch (error: any) {
        logger.error(error.message ?? error);
    }
};

export async function run(): Promise<void> {
    const logger: ILogger = new SignaleLogger();

    tryAndCatch(logger)((): void => {
        const askCommand: AskCommand = new AskCommand({
            logger,
            getProjectTasksUseCaseFactory,
            getProjectConfigurationUseCaseFactory,
            userConfigurationFactory
        });

        askCommand.parse(process.argv);
    });
};
