import { IUseCase } from "@ask-ell/core/dist/src/hexa";

import { ProjectConfigurationAggregateRootState } from "./types";
import { IFileState } from "../../../../domain/entities/project-configuration/entities/file/file.state.interface";
import { ITaskState } from "../../../../domain/entities/project-configuration/entities/task/task.state.interface";
import { IToolState } from "../../../../domain/entities/project-configuration/entities/tool/tool.state.interface";
import { LoginCredentials } from "../../../types";


export type SaveProjectConfigurationUseCaseInput = {
    identifier: string;
    creator: LoginCredentials;
    public?: boolean;
    description?: string;
    files?: IFileState[];
    tasks?: ITaskState[];
    tools?: IToolState[];
}

export interface ISaveProjectConfigurationUseCase extends IUseCase<
    SaveProjectConfigurationUseCaseInput,
    Promise<ProjectConfigurationAggregateRootState>
> {}
