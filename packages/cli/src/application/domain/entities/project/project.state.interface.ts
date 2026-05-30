import { IProjectConfigurationPartialState } from "./project-configuration.partial.state";
import { ITaskState } from "../task/task.state.interface";


export interface IProjectState {
    extends?: IProjectConfigurationPartialState[]
    tasks?: ITaskState[];
}
