import { IEntity } from "@ask-ell/core/dist/src/primitives";

import { IProjectConfigurationState } from "./project-configuration.state.interface";


export interface IProjectConfiguration extends IEntity<IProjectConfigurationState> {
    isEqual(otherProjectConfiguration: IProjectConfiguration): boolean;
}
