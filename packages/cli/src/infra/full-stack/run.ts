import { ILogger } from '@ask-ell/core';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

import { IProjectDTO } from '@ask/back-end-api';

import { GetProjectTasksUseCase, IGetProjectTasksUseCase, IUnitOfWork, RunnableTask } from '../../application';
import { FullStackUnitOfWork } from './full-stack.unit-of-work';
import { AskCommand } from '../commander';
import { SignaleLogger } from '../signale';
import { RootOptions } from '../../shared/options';
import { PROJECT_SETTINGS_FILE_PATH } from '../../shared/path';
import { UserConfiguration } from '../../shared/user.configuration';


export const run = async (): Promise<void> => {
    const logger: ILogger = new SignaleLogger();

    try {
        const askCommand: AskCommand = new AskCommand(logger);
        const rootOptions: RootOptions = askCommand.getRootOptions();
        const userConfiguration: UserConfiguration = new UserConfiguration(rootOptions);
        const unitOfWork: IUnitOfWork = new FullStackUnitOfWork(
            logger,
            rootOptions,
            userConfiguration
        );
        const getProjectTasksUseCase: IGetProjectTasksUseCase = new GetProjectTasksUseCase(unitOfWork);

        if(!existsSync(PROJECT_SETTINGS_FILE_PATH)) {
            throw new Error(`Project settings file not found at path: ${PROJECT_SETTINGS_FILE_PATH}`);
        }

        const project: IProjectDTO = JSON.parse(
            await readFile(PROJECT_SETTINGS_FILE_PATH, 'utf-8')
        );

        const tasks: RunnableTask[] = await getProjectTasksUseCase.run(project);
    
        askCommand.setTasks(tasks);
    
        askCommand.parse(process.argv);
    } catch (error: any) {
        logger.error(error.message ?? error);
    }
};
