import { ILogger } from "@ask-ell/core";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";


type DirectoryCreator = (path: string) => Promise<void>;

export const createDirectoryIfNotExists = (logger: ILogger): DirectoryCreator => async (path: string): Promise<void> => {
    if (existsSync(path)) {
        logger.info(`Directory already exists at path "${path}"`);
        return Promise.resolve();
    }

    await mkdir(path, { recursive: true });
    logger.info(`Directory created at path "${path}"`);
}
