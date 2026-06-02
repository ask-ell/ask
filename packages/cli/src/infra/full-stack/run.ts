import { ILogger } from '@ask-ell/core';

import { GetProjectTasksUseCase, IGetProjectTasksUseCase, IUnitOfWork } from '../../application';
import { FullStackUnitOfWork } from './full-stack.unit-of-work';
import { AskCommand } from '../commander';
import { SignaleLogger } from '../signale';
import { RootOptions } from '../../shared/options';
import { UserConfiguration } from '../../shared/user.configuration';


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
        const getProjectTasksUseCaseFactory = (rootOptions: RootOptions): IGetProjectTasksUseCase => {
            const userConfiguration: UserConfiguration = new UserConfiguration(rootOptions);
            const unitOfWork: IUnitOfWork = new FullStackUnitOfWork(
                logger,
                rootOptions,
                userConfiguration
            );
            return new GetProjectTasksUseCase(unitOfWork);
        };

        const askCommand: AskCommand = new AskCommand({
            logger,
            getProjectTasksUseCaseFactory
        });

        askCommand.parse(process.argv);
    });
};
