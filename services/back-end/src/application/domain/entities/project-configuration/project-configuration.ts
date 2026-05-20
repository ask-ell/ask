import { AggregateRoot } from "@ask-ell/core/dist/src/ddd";
import { IResult, ok } from "@ask-ell/core/dist/src/result";

import { IProjectConfigurationState } from "./project-configuration.state.interface";
import { IProjectConfiguration } from "./project-configuration.interface";


export class ProjectConfiguration extends AggregateRoot<IProjectConfigurationState> implements IProjectConfiguration {
    checkStateValidity(): IResult {
        return ok();
    }
}
