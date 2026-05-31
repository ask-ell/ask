import { IUseCase } from '@ask-ell/core/dist/src/hexa'

import { IProjectState } from "../../../../domain/entities/project/project.state.interface";
import { RunnableTask } from './types';


export interface IGetProjectTasksUseCase extends IUseCase<
    IProjectState,
    Promise<RunnableTask[]>
> {}
