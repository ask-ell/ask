import { IAggregateRootProvider } from "@ask-ell/core/dist/src/hexa";

import { IProjectConfigurationDTO } from "@ask/back-end-api";


export interface IProjectConfigurationProvider extends IAggregateRootProvider<IProjectConfigurationDTO, IProjectConfigurationDTO> {}
