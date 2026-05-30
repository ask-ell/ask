import { writeFile } from "node:fs/promises";
import { ILogger } from "@ask-ell/core";

import { IProjectConfigurationDTO } from "@ask/back-end-api";

import { createDirectoryIfNotExists } from "./directory";
import {
    CACHE_FOLDER_PATH,
    REMOTE_FOLDER_CACHE_PATH,
    PROJECT_CONFIGURATION_HUB_CACHE_PATH,
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
    await createDirectoryIfNotExists(logger)(storage);

    await createDirectoryIfNotExists(logger)(CACHE_FOLDER_PATH(storage));

    await createDirectoryIfNotExists(logger)(REMOTE_FOLDER_CACHE_PATH(remoteUrl)(storage));

    await createDirectoryIfNotExists(logger)(PROJECT_CONFIGURATION_HUB_CACHE_PATH(remoteUrl)(storage));

    await createDirectoryIfNotExists(logger)(PROJECT_CONFIGURATION_CACHE_PATH(data.id)(remoteUrl)(storage));

    await writeFile(VERSION_FILE_PATH(data.version)(data.id)(remoteUrl)(storage), JSON.stringify(data, null, 2));
}
