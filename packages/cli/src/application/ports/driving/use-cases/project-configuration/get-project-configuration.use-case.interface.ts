import { MaybeUndefined } from '@ask-ell/core';
import { IUseCase } from '@ask-ell/core/dist/src/hexa'

import { IProjectConfigurationPartialState } from '../../../../domain/entities/project/project-configuration.partial.state';
import { IProjectConfigurationState } from '../../../../domain/entities/project-configuration/project-configuration.state.interface';


export interface IGetProjectConfigurationUseCase extends IUseCase<
    IProjectConfigurationPartialState,
    Promise<MaybeUndefined<IProjectConfigurationState>>
> {}
