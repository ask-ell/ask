import { IEntity } from "@ask-ell/core";
import { AggregateRootState } from "@ask-ell/core/dist/src/ddd";

import { IVersionTagState } from "./version-tag.state.interface";


// TODO: https://ask-ell.atlassian.net/browse/ASK-16
export interface IVersionTag extends IEntity<AggregateRootState<IVersionTagState>> {}
