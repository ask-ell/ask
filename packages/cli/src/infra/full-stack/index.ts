import { readFile } from 'node:fs/promises';
import { ILogger } from '@ask-ell/core';
import { join } from 'node:path';

import { IProjectDTO, ITaskDTO, IProjectConfigurationDTO } from '@ask/back-end-api';

import { AskCommand, RunCommand, TaskCommand } from '../commander';
import { createDirectoryIfNotExists } from '../../shared/directory';
import { SignaleLogger } from '../signale';
import { getProjectTasks, runTask, TaskRunner } from '../../shared/task';
import { getProjectConfigurations, ProjectConfigurationProvider } from '../../shared/project-configuration';


export const run = async (): Promise<void> => {
    const logger: ILogger = new SignaleLogger();
    const runCommand: RunCommand = new RunCommand();
    const askCommand: AskCommand = new AskCommand();

    askCommand.parse(process.argv);
    const rootOptions = askCommand.getRootOptions();

    const projectConfigurationProvider: ProjectConfigurationProvider<[IProjectDTO]> = getProjectConfigurations({
        logger,
        rootOptions
    });

    const { storage } = rootOptions;
    await createDirectoryIfNotExists(logger)(storage);

    const project: IProjectDTO = JSON.parse(
        await readFile(join(process.cwd(), 'ask.json'), 'utf-8')
    );
    // TODO: check data format

    const projectConfigurations: IProjectConfigurationDTO[] = await projectConfigurationProvider(project);

    const tasks: ITaskDTO[] = await getProjectTasks(project, projectConfigurations);

    tasks.forEach((task: ITaskDTO): void => {
        // const taskProjectConfiguration: MaybeUndefined<IProjectConfigurationDTO> = 
        const taskRunner: TaskRunner = runTask(logger);
        runCommand.addCommand(
            new TaskCommand(task)
                .setTaskRunner(taskRunner)
        );
    });

    askCommand.addCommand(runCommand);
    askCommand.parse(process.argv);
};
