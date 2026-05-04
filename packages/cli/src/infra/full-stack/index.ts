import { readFile } from 'node:fs/promises';
import { HttpClient, ILogger, IResult, MaybeUndefined } from '@ask-ell/core';
import { join } from 'node:path';

import { IProjectConfigurationDTO, IProjectConfigurationPartialDTO, IProjectDTO, ITaskDTO } from '@ask/back-end-api';

import { AskCommand, RunCommand, TaskCommand } from '../commander';
import { TaskRunner, TaskSorter } from '../../shared/task';
import { createDirectoryIfNotExists } from '../../shared/directory';
import { SignaleLogger } from '../signale';


export const run = async (): Promise<void> => {
    const logger: ILogger = new SignaleLogger();
    const taskRunner: TaskRunner = new TaskRunner(logger);
    const runCommand: RunCommand = new RunCommand();
    const askCommand: AskCommand = new AskCommand();
    const taskSorter: TaskSorter = new TaskSorter();

    const { storage } = askCommand.getRootOptions();
    await createDirectoryIfNotExists(logger)(storage);

    const projectFileContent: string = await readFile(join(process.cwd(), 'ask.json'), 'utf-8');
    const project: IProjectDTO = JSON.parse(projectFileContent);

    const { extends: projectConfigurationPartials } = project;

    let projectConfigurations: MaybeUndefined<IProjectConfigurationDTO[]> = undefined;
    
    if(projectConfigurationPartials) {
        // // TODO: extract
        const defaultRemote: string = 'http://localhost:3000';

        const allProjectConfigurations: MaybeUndefined<IProjectConfigurationDTO>[] = await Promise.all(
            projectConfigurationPartials.map(
                async ({ id, remote, version }: IProjectConfigurationPartialDTO): Promise<MaybeUndefined<IProjectConfigurationDTO>> => {
                    const remoteUrl: URL = new URL(remote ?? defaultRemote);
                    let path: string = `project-configurations/${id}`;

                    if(version) {
                        path += `/${version}`;
                    }

                    const logError = (error: Error) => {
                        logger.error(`Error for project configuration "${id}" : ${error.message}`);
                    }

                    return await HttpClient
                        .get<IProjectConfigurationDTO>({
                            url: new URL(path, remoteUrl)
                        })
                        .then((result: IResult<IProjectConfigurationDTO>): MaybeUndefined<IProjectConfigurationDTO> => {
                            if(result.isAFail()) {
                                logError(result.getError());
                            }
                            // TODO: fetch nested configurations
                            return result.getData();
                        })
                        .catch((error: any): undefined => {
                            logError(error);
                            return undefined;
                        });
                }
            )
        );

        projectConfigurations = allProjectConfigurations.filter(projectConfiguration => !!projectConfiguration);

        logger.info(`${projectConfigurations.length} project configurations founded`);

        // TODO: store in cache
    }

    const tasks: ITaskDTO[] = taskSorter.getUniqueTasks({ project, projectConfigurations });

    tasks.forEach((task: ITaskDTO): void => {
        runCommand.addCommand(
            new TaskCommand(task)
                .setTaskRunner(taskRunner)
        );
    });

    askCommand.addCommand(runCommand);
    askCommand.parse(process.argv);
};
