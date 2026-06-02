import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

import { IProjectDTO } from "@ask/back-end-api";

import { PROJECT_SETTINGS_FILE_PATH } from "./path";


export async function getProjectFromLocalFile(): Promise<IProjectDTO> {
    if(!existsSync(PROJECT_SETTINGS_FILE_PATH)) {
        throw new Error(`Project settings file not found at path: ${PROJECT_SETTINGS_FILE_PATH}`);
    }

    const project: IProjectDTO = JSON.parse(
        await readFile(PROJECT_SETTINGS_FILE_PATH, 'utf-8')
    );

    return project;
}
