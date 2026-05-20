export interface ITaskState {
    identifier: string;
    description?: string;
    instructions: string[];
    reauiredFiles?: string[];
}
