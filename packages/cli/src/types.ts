export interface ITask {
    id: string;
    description: string;
    instructions: string[];
}

export interface IProjectConfiguration {
    id: string;
    name: string;
    description: string;
    tasks: ITask[];
}

export interface IProject {
    id: string;
    configuration: string;
    tasks: ITask[];
}
