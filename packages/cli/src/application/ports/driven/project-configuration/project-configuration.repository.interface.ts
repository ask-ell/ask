import { IAggregateRootRepository } from "@ask-ell/core/dist/src/hexa";

import { IProjectConfigurationState } from "../../../domain/entities/project-configuration/project-configuration.state.interface";


export interface IProjectConfigurationRepository extends IAggregateRootRepository<IProjectConfigurationState, IProjectConfigurationState> {}
