import { Id, IProjectConfigurationDTO, IProjectDTO, ITaskDTO } from "@ask/back-end-api";
import { ILogger, MaybeUndefined } from "@ask-ell/core";
import { execSync } from "node:child_process";

import { ProjectConfigurationProvider } from "./project-configuration";


type TaskProvider<Args extends any[]> = (...args: Args) => Promise<ITaskDTO[]>;

const addStyleToDescription = (origin: string) => ({ description }: ITaskDTO): string => description ? `${description} <- ${origin}` : `<- ${origin}`;

export const getProjectTasks = ({
    projectConfigurationProvider
}: {
    projectConfigurationProvider: ProjectConfigurationProvider<[IProjectDTO]>
}): TaskProvider<[IProjectDTO]> => async (project: IProjectDTO): Promise<ITaskDTO[]> => {
    const tasks: Map<Id, ITaskDTO> = new Map();

    project.tasks?.forEach((task: ITaskDTO): void => {
        task.description = addStyleToDescription('*')(task);
        tasks.set(task.id, task);
    });

    const projectConfigurations: IProjectConfigurationDTO[] = await projectConfigurationProvider(project);

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

    return Array.from(tasks.values());
}


export type TaskRunner = (task: ITaskDTO) => void;

export const runTask = ({
    logger
}: {
    logger: ILogger
}): TaskRunner => (task: ITaskDTO): void => {
    task.instructions.forEach((instruction: string): void => {
        if(instruction.includes('@ask')){
            instruction = instruction.replace('@ask', process.argv[1]);
        }

        logger.info(`Running instruction: ${instruction}`);
        execSync(instruction, { stdio: 'inherit' });
        logger.info(`Task completed !`);
    });
};
