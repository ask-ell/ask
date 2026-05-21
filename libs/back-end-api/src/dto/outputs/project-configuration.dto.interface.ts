import { IAggregate } from "../../types/aggregate.interface";
import { IFileDTO } from "./file.dto.interface";
import { ITaskDTO } from "./task.dto.interface";
import { IToolDTO } from "./toold.dto.interface";


export interface IProjectConfigurationDTO extends IAggregate<'project-configuration'> {
    version?: string;
    public?: boolean;
    description?: string;
    files?: IFileDTO[];
    tasks?: ITaskDTO[];
    tools?: IToolDTO[];
}
