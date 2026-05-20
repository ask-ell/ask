import { AggregateRootState } from "@ask-ell/core/dist/src/ddd";

import { IProjectConfigurationState } from "../../../../domain/entities/project-configuration/project-configuration.state.interface";


export type ProjectConfigurationAggregateRootState = AggregateRootState<IProjectConfigurationState>;
