import { ILogger } from "@ask-ell/core";

import { ActionCallbackParams, ChildCommand } from "./child.command";


export class PullCommand extends ChildCommand {
    constructor(
        private logger: ILogger,
    ) {
        super('pull');
        this
            .description('pull a configuration id')
            .argument('<project-configuration-id>', 'project configuration identifier')
            .action(this.pull.bind(this));
    }

    private async pull({ args }: ActionCallbackParams): Promise<void> {
        const projectConfigurationId: string = args[0];
        this.logger.info(`Pulling project configuration "${projectConfigurationId}"...`);
        // TODO: to implement
        this.logger.info(`Project configuration "${projectConfigurationId}" pulled !`);
    }
}
