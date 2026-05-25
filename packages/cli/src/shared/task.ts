import { ILogger, MaybeUndefined } from "@ask-ell/core";
import { execSync } from "node:child_process";
import { join } from "node:path";
import { existsSync } from "node:fs";

import { Id, IProjectConfigurationDTO, IProjectDTO, ITaskDTO, IFileDTO } from "@ask/back-end-api";


const addStyleToDescription = (origin: string) => ({ description }: ITaskDTO): string => description ? `${description} <- ${origin}` : `<- ${origin}`;

type Aggregate = IProjectConfigurationDTO;

export type RunnableTask = ITaskDTO & {
    aggregates?: Aggregate[];
}

export const getProjectTasks = async (project: IProjectDTO, projectConfigurations: IProjectConfigurationDTO[]): Promise<RunnableTask[]> => {
    const tasks: Map<Id, ITaskDTO> = new Map();

    project.tasks?.forEach((task: ITaskDTO): void => {
        task.description = addStyleToDescription('*')(task);
        tasks.set(task.id, task);
    });

    projectConfigurations?.forEach((projectConfiguration: IProjectConfigurationDTO): void => {
        projectConfiguration.tasks?.forEach((task: ITaskDTO): void => {
            task.description = addStyleToDescription(projectConfiguration.id)(task);
            tasks.set(task.id, task);
        });
    });

    tasks.forEach((task: ITaskDTO): void => {
        if(task.id.includes('pre:')) {
            const nextTaskId: Id = task.id.split('pre:')[1];
            const nextTask: MaybeUndefined<ITaskDTO> = tasks.get(nextTaskId);
            if(nextTask) {
                nextTask.instructions = [...task.instructions, ...nextTask.instructions];
                tasks.set(nextTaskId, nextTask);
            }
            return;
        }

        if(task.id.includes('post:')) {
            const previousTaskId: Id = task.id.split('post:')[1];
            tasks.get(previousTaskId)?.instructions.push(...task.instructions);
        }
    });

    const runnableTasks: RunnableTask[] = [];

    tasks.forEach((task: ITaskDTO): void => {
        const runnableTask: RunnableTask = {
            ...task
        };
        task.files?.forEach((file: string): void => {
            projectConfigurations.forEach((aggregate: IProjectConfigurationDTO): void => {
                aggregate.files?.forEach((aggregateFile: IFileDTO): void => {
                    if(aggregateFile.path === file) {
                        if(!runnableTask.aggregates) {
                            runnableTask.aggregates = [];
                        }
                        runnableTask.aggregates.push(aggregate);
                    }
                });
            });
        });

        runnableTasks.push(runnableTask)
    });

    return runnableTasks;
};

const runInstruction = (logger: ILogger) => (instruction: string): void => {
    if(instruction.includes('@ask')){
        instruction = instruction.replace('@ask', process.argv[1]);
    }
    
    logger.info(`Running instruction: ${instruction}`);
    execSync(instruction, { stdio: 'inherit' });
    logger.info(`Task completed !`);
};

export type TaskRunner = (task: RunnableTask) => void;

export const runTask = (logger: ILogger): TaskRunner => (task: RunnableTask): void => {
    task.files?.forEach((fileName: string): void => {
        const filePath: string = join(process.cwd(), fileName);
        if(existsSync(filePath)) {
            return;
        }
        // TODO: uncomment
        let fileDTO: any = undefined;
        task.aggregates?.forEach((aggregate: Aggregate): void => {
            aggregate.files?.forEach((file: IFileDTO): void => {
                if(file.path === fileName) {
                    fileDTO = file;
                }
            });
        });

        if(!fileDTO) {
            throw new Error(`File "${fileName}" is not defined`);
        }

        fileDTO.instructions.forEach(runInstruction(logger));
    });

    task.instructions.forEach(runInstruction(logger));
};
