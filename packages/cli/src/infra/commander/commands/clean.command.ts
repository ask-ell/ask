import { ILogger } from "@ask-ell/core";
import { Command } from "commander";
import { rm } from "fs/promises";

import { RootOptions } from "../types";
import { CACHE_FOLDER_PATH } from "../../../shared/path";


export class CleanCommand extends Command {
    constructor(
        logger: ILogger,
        { storage }: RootOptions
    ) {
        super('clean');
        this
            .description('clean the cache directory')
            .action(async (): Promise<void> => {
                const cacheFolderPath: string = CACHE_FOLDER_PATH(storage);
                await rm(
                    cacheFolderPath,
                    { recursive: true }
                )
                logger.info(`Cache directory cleaned: ${cacheFolderPath}`);
            });
    }
}
