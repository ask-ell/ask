import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import { HttpClient, ILogger, throwResultError } from '@ask-ell/core';
import { join } from 'node:path';

import { IProjectConfigurationDTO, IProjectDTO, ITaskDTO, PartialAggregate } from '@ask-ell/back-end-api';

import { AskCommand } from '../commander';
import { TaskSorter } from '../../shared/task.sorter';


export const run = async (): Promise<void> => {
    const logger: ILogger = console;
    const command = new AskCommand();

    command.parse(process.argv);

    const { storage } = command.getRootOptions();
    if(!existsSync(storage)) {
        await mkdir(storage, { recursive: true });
        logger.info(`Storage folder created at path "${storage}"`);
    }

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

    const tasks: ITaskDTO[] = new TaskSorter(project, projectConfiguration).getUniqueTasks();
    command.setTasks(tasks);

    command.parse(process.argv);
};
