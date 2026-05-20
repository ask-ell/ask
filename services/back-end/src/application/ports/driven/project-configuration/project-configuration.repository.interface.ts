import { IAggregateRootRepository } from "@ask-ell/core/dist/src/hexa";

import { IProjectConfigurationState } from '../../../domain/entities/project-configuration/project-configuration.state.interface'
import { ProjectConfigurationAggregateRootState } from "../../driving/use-cases/project-configuration/types";


export interface IProjectConfigurationRepository extends IAggregateRootRepository<IProjectConfigurationState, ProjectConfigurationAggregateRootState> {}
