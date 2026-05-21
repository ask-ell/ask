export interface ITaskState {
    id: string;
    description?: string;
    instructions: string[];
    requiredFiles?: string[];
}
