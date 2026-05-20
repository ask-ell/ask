import { MaybeUndefined } from "@ask-ell/core";
import { IUseCase } from "@ask-ell/core/dist/src/hexa";

import { ProjectConfigurationAggregateRootState } from "./types";


export type FindOneProjectConfigurationUseCaseInput = {
    id: string;
    version?: string;
}

export interface IFindOneProjectConfigurationUseCase extends IUseCase<
    FindOneProjectConfigurationUseCaseInput,
    Promise<MaybeUndefined<ProjectConfigurationAggregateRootState>>
> {}
