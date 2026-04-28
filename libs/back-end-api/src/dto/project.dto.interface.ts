import { IAggregate } from "../types/aggregate.interface";
import { Id } from "../types/id";
import { ITaskDTO } from "./task.dto.interface";


export interface IProjectDTO extends IAggregate<'project'> {
    id: Id;
    configuration: Id;
    tasks?: ITaskDTO[];
}
