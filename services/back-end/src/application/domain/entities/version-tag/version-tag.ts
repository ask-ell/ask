import { IResult, ok } from "@ask-ell/core";
import { AggregateRoot } from "@ask-ell/core/dist/src/ddd"

import { IVersionTagState } from "./version-tag.state.interface"
import { IVersionTag } from "./version-tag.interface";


export class VersionTag extends AggregateRoot<IVersionTagState> implements IVersionTag {
    checkStateValidity(): IResult {
        return ok();
    }
}
