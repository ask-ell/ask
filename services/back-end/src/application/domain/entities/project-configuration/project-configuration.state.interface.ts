import { IFileState } from "./entities/file/file.state.interface";
import { ITaskState } from "./entities/task/task.state.interface";
import { IToolState } from "./entities/tool/tool.state.interface";


export interface IProjectConfigurationState {
    identifier: string;
    version: string;
    public?: boolean;
    description?: string;
    files?: IFileState[];
    tasks?: ITaskState[];
    tools?: IToolState[];
}
