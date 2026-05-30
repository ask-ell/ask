import { writeFile } from "node:fs/promises";
import { ILogger } from "@ask-ell/core";

import { IProjectConfigurationDTO } from "@ask/back-end-api";

import { createDirectoryIfNotExists } from "./directory";
import {
    PROJECT_CONFIGURATION_CACHE_PATH,
    VERSION_FILE_PATH
} from "./path";


export const writeProjectConfigurationCache = async ({
    logger,
    storage,
    remoteUrl,
    data
}: {
    logger: ILogger,
    storage: string,
    remoteUrl: URL,
    data: IProjectConfigurationDTO
}) => {
    await createDirectoryIfNotExists(logger)(PROJECT_CONFIGURATION_CACHE_PATH(data.id)(remoteUrl)(storage));

    const projectConfigurationCachePath: string = VERSION_FILE_PATH(data.version)(data.id)(remoteUrl)(storage);

    await writeFile(projectConfigurationCachePath, JSON.stringify(data, null, 2));

    logger.info(`File created at path "${projectConfigurationCachePath}"`);
}
