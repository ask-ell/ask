import { readFile } from 'node:fs/promises';
import { ILogger } from '@ask-ell/core';
import { join } from 'node:path';

import { IProjectDTO, ITaskDTO } from '@ask/back-end-api';

import { AskCommand, RunCommand, TaskCommand } from '../commander';
import { TaskRunner, TaskSorter } from '../../shared/task';
import { createDirectoryIfNotExists } from '../../shared/directory';


export const run = async (): Promise<void> => {
    const logger: ILogger = console;
    const taskRunner: TaskRunner = new TaskRunner(logger);
    const runCommand: RunCommand = new RunCommand();
    const askCommand: AskCommand = new AskCommand();
    const taskSorter: TaskSorter = new TaskSorter();

    const { storage } = askCommand.getRootOptions();
    await createDirectoryIfNotExists(logger)(storage);

    const projectFileContent: string = await readFile(join(process.cwd(), 'ask.json'), 'utf-8');
    const project: IProjectDTO = JSON.parse(projectFileContent);

    // TODO: check parsing

    // // TODO: extract
    // const host: string = 'http://localhost:3000';

    // const projectConfiguration: IProjectConfigurationDTO = throwResultError(
    //     await HttpClient.get<IProjectConfigurationDTO>({
    //         url: new URL(`project-configurations/${project.configuration}`, host)
    //     })
    // );

    // TODO: store in cache

    const tasks: ITaskDTO[] = taskSorter.getUniqueTasks({ project });

    tasks.forEach((task: ITaskDTO): void => {
        runCommand.addCommand(
            new TaskCommand(task)
                .setTaskRunner(taskRunner)
        );
    });

    askCommand.addCommand(runCommand);
    askCommand.parse(process.argv);
};
