import { writeFile } from "node:fs/promises";
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
    const remoteFolderPath: string = `${storage}/.cache/${remoteUrl.toString().replace('://', '_')}`;
    const filePath: string = `${remoteFolderPath}/${data.id}.json`;
    await createDirectoryIfNotExists(logger)(storage);
    await createDirectoryIfNotExists(logger)(`${storage}/.cache`);
    await createDirectoryIfNotExists(logger)(remoteFolderPath);
    await writeFile(filePath, JSON.stringify(data, null, 2));
}
