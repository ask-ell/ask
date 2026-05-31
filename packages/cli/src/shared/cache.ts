import { writeFile } from "node:fs/promises";
import { ILogger } from "@ask-ell/core";

import { IProjectConfigurationDTO } from "@ask/back-end-api";

import { createDirectoryIfNotExists } from "./directory";
import {
    PROJECT_CONFIGURATION_CACHE_PATH,
    VERSION_FILE_PATH
} from "./path";


export async function writeProjectConfigurationCache({
    logger,
    storage,
    remoteUrl,
    projectConfiguration
}: {
    logger: ILogger,
    storage: string,
    remoteUrl: URL,
    projectConfiguration: IProjectConfigurationDTO
}): Promise<void> {
    await createDirectoryIfNotExists(logger)(PROJECT_CONFIGURATION_CACHE_PATH(projectConfiguration.id)(remoteUrl)(storage));

    const projectConfigurationCachePath: string = VERSION_FILE_PATH(projectConfiguration.version)(projectConfiguration.id)(remoteUrl)(storage);

    await writeFile(projectConfigurationCachePath, JSON.stringify(projectConfiguration, null, 2));

    logger.info(`File created at path "${projectConfigurationCachePath}"`);
}


export type VersionTagCache = {
    version: string;
}

export async function writeVersionTagCache({
    logger,
    storage,
    remoteUrl,
    projectConfiguration,
    version
}: {
    logger: ILogger,
    storage: string,
    remoteUrl: URL,
    projectConfiguration: IProjectConfigurationDTO,
    version: string
}): Promise<void> {
    await createDirectoryIfNotExists(logger)(PROJECT_CONFIGURATION_CACHE_PATH(projectConfiguration.id)(remoteUrl)(storage));

    const projectConfigurationCachePath: string = VERSION_FILE_PATH(version)(projectConfiguration.id)(remoteUrl)(storage);

    const cachedData: VersionTagCache = {
        version: projectConfiguration.version
    };

    await writeFile(projectConfigurationCachePath, JSON.stringify(cachedData, null, 2));

    logger.info(`File created at path "${projectConfigurationCachePath}"`);
}
