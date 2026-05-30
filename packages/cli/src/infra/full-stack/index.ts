import { readFile } from 'node:fs/promises';
import { ILogger } from '@ask-ell/core';
import { join } from 'node:path';

import { IProjectDTO, ITaskDTO, IProjectConfigurationDTO } from '@ask/back-end-api';

import { AskCommand } from '../commander';
import { SignaleLogger } from '../signale';
import { createDirectoryIfNotExists } from '../../shared/directory';
import { getProjectTasks } from '../../shared/task';
import { RootOptions } from '../../shared/options';
import { getProjectConfigurations, ProjectConfigurationProvider } from '../../shared/project-configuration';


export const run = async (): Promise<void> => {
    const logger: ILogger = new SignaleLogger();
    const askCommand: AskCommand = new AskCommand(logger);

    const rootOptions: RootOptions = askCommand.getRootOptions();

    const projectConfigurationProvider: ProjectConfigurationProvider<[IProjectDTO]> = getProjectConfigurations({
        logger,
        rootOptions
    });

    // TODO: move in directory manager class
    const { storage } = rootOptions;
    await createDirectoryIfNotExists(logger)(storage);

    // TODO: move in directory manager class
    const project: IProjectDTO = JSON.parse(
        await readFile(join(process.cwd(), 'ask.json'), 'utf-8')
    );
    // TODO: check data format

    const projectConfigurations: IProjectConfigurationDTO[] = await projectConfigurationProvider(project);

    const tasks: ITaskDTO[] = await getProjectTasks(project, projectConfigurations);

    askCommand.setTasks(tasks);

    askCommand.parse(process.argv);
};
