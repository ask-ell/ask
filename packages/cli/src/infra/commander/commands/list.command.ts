import { MaybeUndefined } from "@ask-ell/core";

import { IProjectDTO } from "@ask/back-end-api";

import { IGetProjectTasksUseCase, RunnableTask } from "../../../application";
import { ActionCallbackParams, ChildCommand } from "./child.command";
import { RootOptions } from "../../../shared/options";
import { getProjectFromLocalFile } from "../../../shared/project";


export class ListCommand extends ChildCommand {
    private getProjectTasksUseCase: MaybeUndefined<IGetProjectTasksUseCase>;

    constructor(
        private getProjectTasksUseCaseFactory: (rootOptions: RootOptions) => IGetProjectTasksUseCase,
    ) {
        super('list');
        this
            .description('list project tasks')
            .action(this.list.bind(this));
    }

    private async list({ options }: ActionCallbackParams): Promise<void> {
        if(!this.getProjectTasksUseCase){
            this.getProjectTasksUseCase = this.getProjectTasksUseCaseFactory(options);
        }

        const project: IProjectDTO = await getProjectFromLocalFile();

        const tasks: RunnableTask[] = await this.getProjectTasksUseCase.run(project);

        console.table(tasks.map(({
            id: ID,
            description: Description,
            origin
        }: RunnableTask): any => ({
            ID,
            Description,
            "Project Configuration": origin?.id
        })));
    }
}
