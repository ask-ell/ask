import { Id } from "../types/id";


export interface ITaskDTO {
    id: Id;
    instructions: string[];
    description?: string;
    files?: string[];
}
