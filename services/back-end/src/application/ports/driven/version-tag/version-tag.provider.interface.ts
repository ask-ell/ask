import { MaybeUndefined } from "@ask-ell/core";
import { IAggregateRootProvider } from "@ask-ell/core/dist/src/hexa";

import { IVersionTagState } from '../../../domain/entities/version-tag/version-tag.state.interface';
import { VersionTagAggregateRootState } from '../../types';


export type FindOneByTagAndIdentifierDTO = {
    tag: string;
    identifier: string;
}

export interface IVersionTagProvider extends IAggregateRootProvider<IVersionTagState, VersionTagAggregateRootState> {
    findOneByTagAndIdentifier(dto: FindOneByTagAndIdentifierDTO): Promise<MaybeUndefined<VersionTagAggregateRootState>>;
}
