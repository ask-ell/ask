import { IAggregateRootRepository } from "@ask-ell/core/dist/src/hexa";

import { IProjectConfigurationDTO } from "@ask/back-end-api";


export interface IProjectConfigurationRepository extends IAggregateRootRepository<IProjectConfigurationDTO, IProjectConfigurationDTO> {}
