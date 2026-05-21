import { IUseCase } from "@ask-ell/core/dist/src/hexa";

import { ProjectConfigurationAggregateRootState } from "./types";
import { IFileState } from "../../../../domain/entities/file/file.state.interface";
import { ITaskState } from "../../../../domain/entities/task/task.state.interface";
import { IToolState } from "../../../../domain/entities/tool/tool.state.interface";


export type SaveProjectConfigurationUseCaseInput = {
    identifier: string;
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
