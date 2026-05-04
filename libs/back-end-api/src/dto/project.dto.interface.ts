import { IProjectConfigurationPartialDTO } from "./project-configuration.partial.dto.interface";
import { ITaskDTO } from "./task.dto.interface";


export interface IProjectDTO {
    extends?: IProjectConfigurationPartialDTO[]
    tasks?: ITaskDTO[];
}
