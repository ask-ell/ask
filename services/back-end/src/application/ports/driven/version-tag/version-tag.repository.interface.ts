import { IAggregateRootRepository } from "@ask-ell/core/dist/src/hexa";

import { IVersionTagState } from '../../../domain/entities/version-tag/version-tag.state.interface';
import { VersionTagAggregateRootState } from "../../types";


export interface IVersionTagRepository extends IAggregateRootRepository<IVersionTagState, VersionTagAggregateRootState> {}
