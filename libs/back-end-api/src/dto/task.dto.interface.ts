import { Id } from "../types/id";


export interface ITaskDTO {
    id: Id;
    description: string;
    instructions: string[];
    files?: string[];
}
