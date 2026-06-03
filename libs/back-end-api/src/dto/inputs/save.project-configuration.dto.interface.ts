import { IFileDTO } from "../outputs/file.dto.interface";
import { ITaskDTO } from "../outputs/task.dto.interface";
import { IToolDTO } from "../outputs/toold.dto.interface";


export interface ISaveProjectConfigurationDTO {
    id: string;
    public?: boolean;
    description?: string;
    files?: IFileDTO[];
    tasks?: ITaskDTO[];
    tools?: IToolDTO[];
}
