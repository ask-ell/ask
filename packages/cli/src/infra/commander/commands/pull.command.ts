import { ILogger, MaybeUndefined } from "@ask-ell/core";
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';

import { ActionCallbackParams, ChildCommand } from "./child.command";
import { GetProjectConfigurationUseCaseFactory, UserConfigurationFactory } from "../../../shared/factories";
import { IGetProjectConfigurationUseCase, IProjectConfigurationState } from "../../../application";
import { VERSION_FILE_PATH } from "../../../shared/path";
import { UserConfiguration } from "../../../shared/user.configuration";


export class PullCommand extends ChildCommand {
    private getProjectConfigurationUseCase: MaybeUndefined<IGetProjectConfigurationUseCase>;
    private userConfiguration: MaybeUndefined<UserConfiguration>;

    constructor(
        logger: ILogger,
        private getProjectConfigurationUseCaseFactory: GetProjectConfigurationUseCaseFactory,
        private userConfigurationFactory: UserConfigurationFactory
    ) {
        super({
            name: 'pull',
            logger
        });
        this
            .description('pull a configuration id')
            .argument('<project-configuration-id>', 'project configuration identifier')
            .wrappedAction(this.pull.bind(this));
    }

    private async pull({ options, args }: ActionCallbackParams): Promise<void> {
        const projectConfigurationId: string = args[0];
        this.logger.info(`Pulling project configuration "${projectConfigurationId}"...`);

        if(!this.getProjectConfigurationUseCase) {
            this.getProjectConfigurationUseCase = this.getProjectConfigurationUseCaseFactory({
                options,
                logger: this.logger
            });
        }

        if(!this.userConfiguration) {
            this.userConfiguration = this.userConfigurationFactory({
                options
            });
        }

        const remoteUrl: URL = new URL(options.remote ?? this.userConfiguration.getInstance().defaultRemote);
        const LATEST_VERSION_PROJECT_CACHE_FILE: string = VERSION_FILE_PATH('latest')(projectConfigurationId)(remoteUrl)(options.storage);
        if(existsSync(LATEST_VERSION_PROJECT_CACHE_FILE)){
            await rm(LATEST_VERSION_PROJECT_CACHE_FILE);
        }

        const projectConfiguration: MaybeUndefined<IProjectConfigurationState> = await this.getProjectConfigurationUseCase.run({
            id: projectConfigurationId,
            version: 'latest'
        });

        if(!projectConfiguration) {
            throw new Error(`Project configuration "${projectConfigurationId}" not found !`);
        }

        this.logger.info(`Project configuration "${projectConfigurationId}" pulled !`);
    }
}
