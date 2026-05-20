import { IEntity } from "@ask-ell/core";
import { AggregateRootState } from "@ask-ell/core/dist/src/ddd";

import { IVersionTagState } from "./version-tag.state.interface";


export interface IVersionTag extends IEntity<AggregateRootState<IVersionTagState>> { // TODO: add interface IAggregateRoot in @ask-ell/core
}
