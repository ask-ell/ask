import { ILogger } from "@ask-ell/core";
import { rm } from "node:fs/promises";
import { existsSync } from "node:fs";

import { ActionCallbackParams, ChildCommand } from "./child.command";
import { CACHE_FOLDER_PATH } from "../../../shared/path";


export class CleanCommand extends ChildCommand {
    constructor(
        logger: ILogger
    ) {
        super({
            id: 'clean',
            logger
        });
        this
            .description('clean the cache directory')
            .wrappedAction(this.clean.bind(this));
    }

    private async clean({ rootOptions: { storage } }: ActionCallbackParams): Promise<void> {
        const cacheFolderPath: string = CACHE_FOLDER_PATH(storage);
        if(!existsSync(cacheFolderPath)) {
            this.logger.warn(`Cache directory not found at path: ${cacheFolderPath}`);
            return Promise.resolve();
        }
        await rm(
            cacheFolderPath,
            { recursive: true }
        )
        this.logger.info(`Cache directory cleaned: ${cacheFolderPath}`);
    }
}
