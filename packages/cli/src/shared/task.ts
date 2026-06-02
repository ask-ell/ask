import { ILogger } from "@ask-ell/core";
import { execSync } from "node:child_process";

import { RunnableTask } from '../application';


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
    task.instructions.forEach(runInstruction(logger));
};
