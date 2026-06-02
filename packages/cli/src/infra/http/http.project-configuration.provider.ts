import { MaybeUndefined, ILogger, HttpError } from '@ask-ell/core';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

import { IProjectConfigurationDTO } from '@ask/back-end-api';

import { IProjectConfigurationPartialState, IProjectConfigurationProvider, IProjectConfigurationState } from '../../application';
import { RootOptions } from '../../shared/options';
import { UserConfiguration } from '../../shared/user.configuration';
import { ProjectConfigurationController } from '../../shared/api';
import { VersionTagCache, writeProjectConfigurationCache, writeVersionTagCache } from '../../shared/cache';
import { VERSION_FILE_PATH } from '../../shared/path';


export class HttpProjectConfigurationProvider implements IProjectConfigurationProvider {
    private defaultRemote: string;

    constructor(
        private logger: ILogger,
        private rootOptions: RootOptions,
        userConfiguration: UserConfiguration
    ) {
        this.defaultRemote = rootOptions.remote ?? userConfiguration.getInstance().defaultRemote;
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
        version: definedVersion
    }: IProjectConfigurationPartialState): Promise<MaybeUndefined<IProjectConfigurationState>> {
        const remoteUrl: URL = new URL(remote ?? this.defaultRemote);

        let version: MaybeUndefined<string> = definedVersion;

        if(!version) {
            const LATEST_VERSION_PROJECT_CACHE_FILE: string = VERSION_FILE_PATH('latest')(id)(remoteUrl)(this.rootOptions.storage);
            if(existsSync(LATEST_VERSION_PROJECT_CACHE_FILE)){
                const cachedData: VersionTagCache = JSON.parse(
                    await readFile(LATEST_VERSION_PROJECT_CACHE_FILE, 'utf-8')
                );
                version = cachedData.version;
            }
        }

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
                async (projectConfiguration: IProjectConfigurationDTO): Promise<MaybeUndefined<IProjectConfigurationDTO>> => {
                    const PROJECT_CACHE_FILE: string = VERSION_FILE_PATH(projectConfiguration.version)(projectConfiguration.id)(remoteUrl)(this.rootOptions.storage);
                    if(!existsSync(PROJECT_CACHE_FILE)){
                        await writeProjectConfigurationCache({
                            projectConfiguration,
                            logger: this.logger,
                            remoteUrl,
                            storage: this.rootOptions.storage
                        });
                    }

                    if(!version || version === 'latest') {
                        await writeVersionTagCache({
                            projectConfiguration,
                            logger: this.logger,
                            remoteUrl,
                            storage: this.rootOptions.storage,
                            version: 'latest'
                        });
                    }

                    return projectConfiguration;
                }
            )
            .catch((error: any): undefined => {
                this.logger.error(
                    `Error for project configuration "${id}" : ${error instanceof HttpError ? error.data.message : error}`,
                );
                return undefined;
            });
    }
}
