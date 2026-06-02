import { ILogger, MaybeUndefined } from "@ask-ell/core";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

import { IProjectDTO } from "@ask/back-end-api";

import { IGetProjectTasksUseCase, RunnableTask } from "../../../application";
import { ActionCallbackParams, ChildCommand } from "./child.command";
import { PROJECT_SETTINGS_FILE_PATH } from "../../../shared/path";
import { runTask } from "../../../shared/task";
import { GetProjectTasksUseCaseFactory } from "../../../shared/factories";


export class RunCommand extends ChildCommand {
    private getProjectTasksUseCase: MaybeUndefined<IGetProjectTasksUseCase>;

    constructor(
        logger: ILogger,
        private getProjectTasksUseCaseFactory: GetProjectTasksUseCaseFactory,
    ) {
        super({
            name: 'run',
            logger
        });
        this
            .description('run a project task')
            .argument('<task>', 'task identifier')
            .wrappedAction(this.run.bind(this));
    }

    private async run({ options, args }: ActionCallbackParams): Promise<void> {
        if(!this.getProjectTasksUseCase){
            this.getProjectTasksUseCase = this.getProjectTasksUseCaseFactory({
                options,
                logger: this.logger
            });
        }

        if(!existsSync(PROJECT_SETTINGS_FILE_PATH)) {
            throw new Error(`Project settings file not found at path: ${PROJECT_SETTINGS_FILE_PATH}`);
        }

        const project: IProjectDTO = JSON.parse(
            await readFile(PROJECT_SETTINGS_FILE_PATH, 'utf-8')
        );

        const tasks: RunnableTask[] = await this.getProjectTasksUseCase.run(project);

        const taskId: string = args[0];

        for (const task of tasks) {
            if(task.id !== taskId) {
                runTask(this.logger)(task);
            }
        }

        throw new Error(`Unknown task : "${taskId}"`);
    }
}
