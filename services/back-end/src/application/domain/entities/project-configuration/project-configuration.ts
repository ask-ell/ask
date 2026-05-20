import { AggregateRoot } from "@ask-ell/core/dist/src/ddd";
import { IResult, ok } from "@ask-ell/core/dist/src/result";

import { IProjectConfigurationState } from "./project-configuration.state.interface";


export class ProjectConfiguration extends AggregateRoot<IProjectConfigurationState> {
    checkStateValidity(): IResult {
        return ok();
    }
}
