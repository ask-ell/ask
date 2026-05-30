import { IAggregateRootRepository } from "@ask-ell/core/dist/src/hexa";

import { ProjectConfigurationAggregateRootState } from "../../driving/use-cases/project-configuration/types";


export interface IProjectConfigurationRepository extends IAggregateRootRepository<ProjectConfigurationAggregateRootState, ProjectConfigurationAggregateRootState> {}
