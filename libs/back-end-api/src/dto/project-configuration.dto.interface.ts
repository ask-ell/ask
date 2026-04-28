import { Id } from "../types/id";
import { IFileDTO } from "./file.dto.interface";
import { ITaskDTO } from "./task.dto.interface";
import { IToolDTO } from "./toold.dto.interface";


export interface IProjectConfiguration {
    id: Id;
    description: string;
    files?: IFileDTO[];
    tasks?: ITaskDTO[];
    tools?: IToolDTO[];
}
