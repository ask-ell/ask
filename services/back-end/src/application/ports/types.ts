import { AggregateRootState } from "@ask-ell/core/dist/src/ddd";

import { IVersionTagState } from "../domain/entities/version-tag/version-tag.state.interface";


export type VersionTagAggregateRootState = AggregateRootState<IVersionTagState>;
