import { join } from "path";


type Path = string;

export const PROJECT_SETTINGS_FILE_PATH: Path = join(process.cwd(), 'ask.json');

export const CACHE_FOLDER_PATH = (storage: string): Path => join(
    storage,
    '.cache'
);

export const REMOTE_FOLDER_CACHE_PATH = (remoteUrl: URL) => (storage: string): Path => join(
    CACHE_FOLDER_PATH(storage),
    remoteUrl.toString().replace('://', '_')
);

export const PROJECT_CONFIGURATION_HUB_CACHE_PATH = (remoteUrl: URL) => (storage: string): Path => join(
    REMOTE_FOLDER_CACHE_PATH(remoteUrl)(storage),
    'project-configurations'
);

export const PROJECT_CONFIGURATION_CACHE_PATH = (projectId: string) => (remoteUrl: URL) => (storage: string): Path => join(
    PROJECT_CONFIGURATION_HUB_CACHE_PATH(remoteUrl)(storage),
    projectId
);

export const VERSION_FILE_PATH = (version: string) => (projectId: string) => (remoteUrl: URL) => (storage: string): Path => join(
    PROJECT_CONFIGURATION_CACHE_PATH(projectId)(remoteUrl)(storage),
    `${version}.json`
);
