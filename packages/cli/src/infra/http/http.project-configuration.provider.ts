import { MaybeUndefined, ILogger } from '@ask-ell/core';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

import { IProjectConfigurationDTO } from '@ask/back-end-api';

import { IProjectConfigurationPartialState, IProjectConfigurationProvider, IProjectConfigurationState } from '../../application';
import { RootOptions } from '../../shared/options';
import { getDefaultRemote } from '../../shared/remote';
import { ProjectConfigurationController } from '../../shared/api';
import { writeProjectConfigurationCache } from '../../shared/cache';
import { VERSION_FILE_PATH } from '../../shared/path';


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

    findOneById(): Promise<MaybeUndefined<IProjectConfigurationState>> {
        throw new Error('Method not implemented.');
    }

    async findOneFromPartialState({
        id,
        remote,
        version
    }: IProjectConfigurationPartialState): Promise<MaybeUndefined<IProjectConfigurationState>> {
        const remoteUrl: URL = new URL(remote ?? this.defaultRemote);

        if(version){
            const PROJECT_CACHE_FILE: string = VERSION_FILE_PATH(version)(id)(remoteUrl)(this.rootOptions.storage);
            if(existsSync(PROJECT_CACHE_FILE)){
                this.logger.info(`Project configuration "${id}" version "${version}" found in cache for remote "${remoteUrl.href}".`);
                return JSON.parse(
                    await readFile(PROJECT_CACHE_FILE, 'utf-8')
                );
            }
        }

        return new ProjectConfigurationController(remoteUrl)
            .findOne({
                id,
                version
            })
            .then(
                async (data: IProjectConfigurationDTO): Promise<MaybeUndefined<IProjectConfigurationDTO>> => {
                    const PROJECT_CACHE_FILE: string = VERSION_FILE_PATH(data.version)(data.id)(remoteUrl)(this.rootOptions.storage);
                    if(!existsSync(PROJECT_CACHE_FILE)){
                        await writeProjectConfigurationCache({
                            data,
                            logger: this.logger,
                            remoteUrl,
                            storage: this.rootOptions.storage
                        });
                    }
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
