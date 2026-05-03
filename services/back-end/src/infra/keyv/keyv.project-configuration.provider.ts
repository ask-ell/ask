import { KeyvAggregateRootProvider } from "@ask-ell/keyv";

import { IProjectConfigurationDTO } from "@ask/back-end-api";


export class KeyvProjectConfigurationProvider extends KeyvAggregateRootProvider<IProjectConfigurationDTO, IProjectConfigurationDTO> {}
