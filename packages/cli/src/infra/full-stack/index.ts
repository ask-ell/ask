import { readFile } from 'node:fs/promises';
import { ILogger } from '@ask-ell/core';
import { join } from 'node:path';

import { IProjectDTO, ITaskDTO } from '@ask/back-end-api';

import { GetProjectTasksUseCase, IGetProjectTasksUseCase, IUnitOfWork } from '../../application';
import { AskCommand } from '../commander';
import { SignaleLogger } from '../signale';
import { createDirectoryIfNotExists } from '../../shared/directory';
import { RootOptions } from '../../shared/options';
import { FullStackUnitOfWork } from './full-stack.unit-of-work';


export const run = async (): Promise<void> => {
    const logger: ILogger = new SignaleLogger();
    const askCommand: AskCommand = new AskCommand(logger);
    const rootOptions: RootOptions = askCommand.getRootOptions();

    const unitOfWork: IUnitOfWork = new FullStackUnitOfWork(
        logger,
        rootOptions
    );
    const getProjectTasksUseCase: IGetProjectTasksUseCase = new GetProjectTasksUseCase(unitOfWork);

    // TODO: remove ?
    // TODO: move in directory manager class
    const { storage } = rootOptions;
    await createDirectoryIfNotExists(logger)(storage);

    // TODO: move in directory manager class
    // TODO: throw error if ask.json file does not exist
    const project: IProjectDTO = JSON.parse(
        await readFile(join(process.cwd(), 'ask.json'), 'utf-8')
    );
    // TODO: check data format

    const tasks: ITaskDTO[] = await getProjectTasksUseCase.run(project);

    askCommand.setTasks(tasks);

    askCommand.parse(process.argv);
};
