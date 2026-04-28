import { KeyvAggregateRootProvider } from "@ask-ell/keyv";

import { IProjectConfigurationDTO } from "@ask-ell/ask-back-end-api";


export class ProjectConfigurationKeyvProvider extends KeyvAggregateRootProvider<IProjectConfigurationDTO, IProjectConfigurationDTO> {}
