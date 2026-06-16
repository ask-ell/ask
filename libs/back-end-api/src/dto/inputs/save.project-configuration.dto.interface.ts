import { IFileDTO } from "../outputs/file.dto.interface";
import { ITaskDTO } from "../outputs/task.dto.interface";
import { IToolDTO } from "../outputs/toold.dto.interface";
import { ILoginCredentialsDTO } from "./login-credentials.dto.interface";


export interface ISaveProjectConfigurationDTO {
    id: string;
    creator: ILoginCredentialsDTO;
    public?: boolean;
    description?: string;
    files?: IFileDTO[];
    tasks?: ITaskDTO[];
    tools?: IToolDTO[];
}
