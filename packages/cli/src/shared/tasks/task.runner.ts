import { ILogger } from "@ask-ell/core";
import { execSync } from "node:child_process";

import { ITaskDTO } from "@ask/back-end-api";


export class TaskRunner {
    constructor(
        private logger: ILogger
    ) {}

    run(task: ITaskDTO): void {
        task.instructions.forEach((instruction: string): void => {
            if(instruction.includes('@ask')){
                instruction = instruction.replace('@ask', process.argv[1]);
            }

            this.logger.info(`Running instruction: ${instruction}`);
            execSync(instruction, { stdio: 'inherit' });
            this.logger.info(`Task completed !`);
        });
    }
}