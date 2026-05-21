import { writeFile } from "node:fs/promises";
import { join } from "node:path"
import { ILogger } from "@ask-ell/core";

import { IProjectConfigurationDTO } from "@ask/back-end-api";

import { createDirectoryIfNotExists } from "./directory";


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

    const cacheFolder: string = join(storage, '.cache');
    await createDirectoryIfNotExists(logger)(cacheFolder);

    const remoteFolderCachePath: string = join(cacheFolder, remoteUrl.toString().replace('://', '_'));
    await createDirectoryIfNotExists(logger)(remoteFolderCachePath);

    const projectConfigurationHubCachePath: string = join(remoteFolderCachePath, "project-configurations");
    await createDirectoryIfNotExists(logger)(projectConfigurationHubCachePath);

    const projectConfigurationCachePath: string = join(projectConfigurationHubCachePath, data.id);
    await createDirectoryIfNotExists(logger)(projectConfigurationCachePath);

    const versionFilePath: string = join(projectConfigurationCachePath, `${data.version}.json`);
    await writeFile(versionFilePath, JSON.stringify(data, null, 2));
}
