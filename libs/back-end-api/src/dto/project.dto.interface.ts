import { Id } from "../types/id";
import { ITaskDTO } from "./task.dto.interface";


export interface IProjectDTO {
    id: Id;
    configuration: Id;
    tasks?: ITaskDTO[];
}
