import { readFile } from 'node:fs/promises';
import { ILogger } from '@ask-ell/core';
import { join } from 'node:path';

import { IProjectDTO, ITaskDTO } from '@ask/back-end-api';

import { AskCommand, RunCommand, TaskCommand } from '../commander';
import { createDirectoryIfNotExists } from '../../shared/directory';
import { SignaleLogger } from '../signale';
import { getProjectTasks, runTask, TaskRunner } from '../../shared/task';
import { getProjectConfigurations, ProjectConfigurationProvider } from '../../shared/project-configuration';


export const run = async (): Promise<void> => {
    const logger: ILogger = new SignaleLogger();
    const runCommand: RunCommand = new RunCommand();
    const askCommand: AskCommand = new AskCommand();
    const projectConfigurationProvider: ProjectConfigurationProvider<[IProjectDTO]> = getProjectConfigurations({
        logger
    });
    const taskRunner: TaskRunner = runTask({
        logger
    });

    const { storage } = askCommand.getRootOptions();
    await createDirectoryIfNotExists(logger)(storage);

    const projectFileContent: string = await readFile(join(process.cwd(), 'ask.json'), 'utf-8');

    const project: IProjectDTO = JSON.parse(projectFileContent);
    // TODO: check data format

    const tasks: ITaskDTO[] = await getProjectTasks({
        projectConfigurationProvider
    })(project);

    tasks.forEach((task: ITaskDTO): void => {
        runCommand.addCommand(
            new TaskCommand(task)
                .setTaskRunner(taskRunner)
        );
    });

    askCommand.addCommand(runCommand);
    askCommand.parse(process.argv);
};
