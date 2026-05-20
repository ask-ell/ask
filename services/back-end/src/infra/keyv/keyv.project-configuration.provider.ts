import { KeyvAggregateRootProvider } from "@ask-ell/keyv";

import { IProjectConfigurationState, ProjectConfigurationAggregateRootState } from "../../application";


export class KeyvProjectConfigurationProvider extends KeyvAggregateRootProvider<IProjectConfigurationState, ProjectConfigurationAggregateRootState> {}
