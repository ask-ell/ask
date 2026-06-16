import { ILogger, MaybeUndefined } from "@ask-ell/core";

import { ActionCallbackParams, ChildCommand } from "./child.command";
import { UserConfiguration } from "../../../shared/user.configuration";
import { UserConfigurationFactory } from "../../../shared/factories";


export class LoginCommand extends ChildCommand {
    private userConfiguration: MaybeUndefined<UserConfiguration>;

    constructor(
        logger: ILogger,
        private userConfigurationFactory: UserConfigurationFactory
    ) {
        super({
            id: 'login',
            logger
        });
        this
            .description('login to a remote')
            .argument('<remote-url>', 'remote URL')
            .wrappedAction(this.login.bind(this));
    }

    private async login({ rootOptions, args }: ActionCallbackParams): Promise<void> {
        if(!this.userConfiguration) {
            this.userConfiguration = this.userConfigurationFactory({
                rootOptions
            });
        }

        const remote: string = args[0];
        this.userConfiguration.addRemoteUrl(remote);

        this.logger.info(`Logged as guest to remote "${remote}"`);
    }
}
