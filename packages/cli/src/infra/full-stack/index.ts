import { readFile } from 'node:fs/promises';
import { HttpClient, ILogger, throwResultError } from '@ask-ell/core';
import { join } from 'node:path';

import { IProjectConfigurationDTO, IProjectDTO, ITaskDTO, PartialAggregate } from '@ask/back-end-api';

import { AskCommand, RunCommand } from '../commander';
import { TaskRunner, TaskSorter } from '../../shared/task';
import { createDirectoryIfNotExists } from '../../shared/directory';


export const run = async (): Promise<void> => {
    const logger: ILogger = console;
    const taskRunner: TaskRunner = new TaskRunner(logger);
    const askCommand: AskCommand = new AskCommand();
    const runCommand: RunCommand = new RunCommand();
    const taskSorter: TaskSorter = new TaskSorter();

    askCommand.parse(process.argv);

    const { storage } = askCommand.getRootOptions();
    await createDirectoryIfNotExists(logger)(storage);

    const askFileStringified: string = await readFile(join(process.cwd(), 'ask.json'), 'utf-8');
    const partialProject: PartialAggregate<IProjectDTO> = JSON.parse(askFileStringified);

    // TODO: extract
    const host: string = 'http://localhost:3000';

    const project: IProjectDTO = throwResultError(
        await HttpClient.get<IProjectDTO>({
            url: new URL(`projects/${partialProject.id}`, host)
        })
    );

    const projectConfiguration: IProjectConfigurationDTO = throwResultError(
        await HttpClient.get<IProjectConfigurationDTO>({
            url: new URL(`project-configurations/${project.configuration}`, host)
        })
    );

    // TODO: store in cache

    const tasks: ITaskDTO[] = taskSorter.getUniqueTasks({ project, projectConfiguration });
    tasks.forEach((task: ITaskDTO): void => {
        runCommand.command(task.id)
            .description(task.description)
            .action((): void => taskRunner.run(task));
    });

    runCommand.parse(process.argv);
};
