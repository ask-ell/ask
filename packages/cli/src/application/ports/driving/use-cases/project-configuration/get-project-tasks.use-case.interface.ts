import { IUseCase } from '@ask-ell/core/dist/src/hexa'

import { IProjectState } from "../../../../domain/entities/project/project.state.interface";
import { ITaskState } from "../../../../domain/entities/task/task.state.interface";


export interface IGetProjectTasksUseCase extends IUseCase<
    IProjectState,
    Promise<ITaskState[]>
> {}
