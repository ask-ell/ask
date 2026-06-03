import { ILogger, MaybeUndefined } from "@ask-ell/core";

import { IProjectDTO } from "@ask/back-end-api";

import { IGetProjectTasksUseCase, RunnableTask } from "../../../application";
import { ActionCallbackParams, ChildCommand } from "./child.command";
import { getProjectFromLocalFile } from "../../../shared/project";
import { GetProjectTasksUseCaseFactory } from "../../../shared/factories";
import { fromTaskToTableRow } from "../../../shared/table-rows";


export class ListCommand extends ChildCommand {
    private getProjectTasksUseCase: MaybeUndefined<IGetProjectTasksUseCase>;

    constructor(
        logger: ILogger,
        private getProjectTasksUseCaseFactory: GetProjectTasksUseCaseFactory
    ) {
        super({
            id: 'ls',
            logger
        });
        this
            .description('list project tasks')
            .wrappedAction(this.list.bind(this));
    }

    private async list({ options }: ActionCallbackParams): Promise<void> {
        if(!this.getProjectTasksUseCase){
            this.getProjectTasksUseCase = this.getProjectTasksUseCaseFactory({
                options,
                logger: this.logger
            });
        }

        const project: IProjectDTO = await getProjectFromLocalFile();

        const tasks: RunnableTask[] = await this.getProjectTasksUseCase.run(project);

        console.table(tasks.map(fromTaskToTableRow));
    }
}
