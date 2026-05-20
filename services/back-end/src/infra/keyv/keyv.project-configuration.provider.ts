import { KeyvAggregateRootProvider } from "@ask-ell/keyv";

import { IProjectConfigurationProvider, IProjectConfigurationState, ProjectConfigurationAggregateRootState } from "../../application";


export class KeyvProjectConfigurationProvider extends KeyvAggregateRootProvider<IProjectConfigurationState, ProjectConfigurationAggregateRootState> implements IProjectConfigurationProvider {}
