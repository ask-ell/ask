import { ILogger, MaybeUndefined } from "@ask-ell/core";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

import { IProjectDTO } from "@ask/back-end-api";

import { IGetProjectTasksUseCase, RunnableTask } from "../../../application";
import { ActionCallbackParams, ChildCommand } from "./child.command";
import { PROJECT_SETTINGS_FILE_PATH } from "../../../shared/path";
import { RootOptions } from "../../../shared/options";
import { addStyleToDescription, runTask, TaskRunner } from "../../../shared/task";
import { TaskCommand } from "./task.command";


export class RunCommand extends ChildCommand {
    private getProjectTasksUseCase: MaybeUndefined<IGetProjectTasksUseCase>

    constructor(
        private logger: ILogger,
        private getProjectTasksUseCaseFactory: (rootOptions: RootOptions) => IGetProjectTasksUseCase,
    ) {
        super('run');
        this
            .description('run a project task')
            .argument('<task>', 'task identifier')
            .allowUnknownOption(true)
            .allowExcessArguments()
            .action(this.run.bind(this));
    }

    private async run({ options }: ActionCallbackParams): Promise<void> {
        if(!this.getProjectTasksUseCase){
            this.getProjectTasksUseCase = this.getProjectTasksUseCaseFactory(options);
        }

        if(!existsSync(PROJECT_SETTINGS_FILE_PATH)) {
            throw new Error(`Project settings file not found at path: ${PROJECT_SETTINGS_FILE_PATH}`);
        }

        const project: IProjectDTO = JSON.parse(
            await readFile(PROJECT_SETTINGS_FILE_PATH, 'utf-8')
        );

        const tasks: RunnableTask[] = await this.getProjectTasksUseCase.run(project);

        tasks.forEach((task: RunnableTask): void => {
            task.description = addStyleToDescription(task);
            const taskRunner: TaskRunner = runTask(this.logger);

            this.addCommand(
                new TaskCommand(task)
                    .setTaskRunner(taskRunner)
            );
        });

        // this.parse(process.argv);
    }
}
