import { MaybeUndefined, ILogger } from '@ask-ell/core';
import { Id } from '@ask-ell/core/dist/src/ddd';

import { IProjectConfigurationDTO } from '@ask/back-end-api';

import { IProjectConfigurationPartialState, IProjectConfigurationProvider, IProjectConfigurationState } from '../../application';
import { RootOptions } from '../../shared/options';
import { getDefaultRemote } from '../../shared/remote';
import { ProjectConfigurationController } from '../../shared/api';
import { writeProjectConfigurationCache } from '../../shared/cache';


export class HttpProjectConfigurationProvider implements IProjectConfigurationProvider {
    private defaultRemote!: string;

    constructor(
        private logger: ILogger,
        private rootOptions: RootOptions
    ) {
        this.defaultRemote = rootOptions.remote ?? getDefaultRemote();
    }

    findAll(): Promise<IProjectConfigurationState[]> {
        throw new Error('Method not implemented.');
    }

    findOneById(id: Id): Promise<MaybeUndefined<IProjectConfigurationState>> {
        throw new Error('Method not implemented.');
    }

    async findOneFromPartialState({
        id,
        remote,
        version
    }: IProjectConfigurationPartialState): Promise<MaybeUndefined<IProjectConfigurationState>> {
        const remoteUrl: URL = new URL(remote ?? this.defaultRemote);

        // TODO: read files cache here

        return new ProjectConfigurationController(remoteUrl)
            .findOne({
                id,
                version
            })
            .then(
                async (data: IProjectConfigurationDTO): Promise<MaybeUndefined<IProjectConfigurationDTO>> => {
                    // TODO: use a global service
                    await writeProjectConfigurationCache({
                        data,
                        logger: this.logger,
                        remoteUrl,
                        storage: this.rootOptions.storage
                    });
                    return data;
                }
            )
            .catch((error: any): undefined => {
                this.logger.error(
                    `Error for project configuration "${id}" : ${error.message ?? error}`,
                );
                return undefined;
            });
    }
}
