import { ILogger, MaybeUndefined } from "@ask-ell/core";
import { execSync } from "node:child_process";
import { join } from "node:path";
import { existsSync } from "node:fs";

import { Id, IProjectConfigurationDTO, IProjectDTO, ITaskDTO } from "@ask/back-end-api";


const addStyleToDescription = (origin: string) => ({ description }: ITaskDTO): string => description ? `${description} <- ${origin}` : `<- ${origin}`;

export const getProjectTasks = async (project: IProjectDTO, projectConfigurations: IProjectConfigurationDTO[]): Promise<ITaskDTO[]> => {
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

    return Array.from(tasks.values());
};

const runInstruction = (logger: ILogger) => (instruction: string): void => {
    if(instruction.includes('@ask')){
        instruction = instruction.replace('@ask', process.argv[1]);
    }
    
    logger.info(`Running instruction: ${instruction}`);
    execSync(instruction, { stdio: 'inherit' });
    logger.info(`Task completed !`);
};

export type TaskRunner = (task: ITaskDTO) => void;

export const runTask = (logger: ILogger): TaskRunner => (task: ITaskDTO): void => {
    task.files?.forEach((fileName: string): void => {
        const filePath: string = join(process.cwd(), fileName);
        if(existsSync(filePath)) {
            return;
        }
        // TODO: uncomment
        // const fileDTO: MaybeUndefined<IFileDTO> = projectConfiguration.files.find(
        //     (file: IFileDTO): boolean => file.path === fileName
        // );
        // if(!fileDTO) {
        //     throw new Error(`File "${fileName}" is not defined in project configuration "${projectConfiguration.id}"`);
        // }

        // fileDTO.instructions.forEach(runInstruction(logger));
    });

    task.instructions.forEach(runInstruction(logger));
};
