import { IFileState } from "../file/file.state.interface";
import { ITaskState } from "../task/task.state.interface";
import { IToolState } from "../tool/tool.state.interface";


export interface IProjectConfigurationState {
    identifier: string;
    version: string;
    public?: boolean;
    description?: string;
    files?: IFileState[];
    tasks?: ITaskState[];
    tools?: IToolState[];
}
