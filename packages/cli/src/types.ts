export type Id = string;


export interface ITool {
    name: string;
    url: string;
}

export interface IFile {
    path: string;
    instructions: string[];
}

export interface ITask {
    id: Id;
    description: string;
    instructions: string[];
    files?: string[];
}

export interface IProjectConfiguration {
    id: Id;
    description: string;
    files?: IFile[];
    tasks?: ITask[];
    tools?: ITool[];
}

export interface IProject {
    id: Id;
    configuration: Id;
    tasks?: ITask[];
}
