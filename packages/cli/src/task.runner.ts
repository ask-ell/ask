import { ILogger } from "@ask-ell/core";
import { execSync } from "node:child_process";

import { ITask } from "./types";


export class TaskRunner {
    // TODO: customize logger
    private logger: ILogger = console;

    constructor(
        private task: ITask
    ) {}

    run(): void {
        this.task.instructions.forEach((instruction: string): void => {
            if(instruction.includes('@ask')){
                instruction = instruction.replace('@ask', process.argv[1]);
            }

            this.logger.info(`Running instruction: ${instruction}`);
            execSync(instruction, { stdio: 'inherit' });
            this.logger.info(`Task completed !`);
        });
    }
}