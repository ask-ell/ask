import { IProjectConfigurationState } from "../../../../domain/entities/project-configuration/project-configuration.state.interface";
import { ITaskState } from "../../../../domain/entities/task/task.state.interface";


export type RunnableTask = ITaskState & {
    origin?: IProjectConfigurationState;
}
