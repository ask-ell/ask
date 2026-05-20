import { KeyvAggregateRootRepository } from "@ask-ell/keyv";

import { VersionTagAggregateRootState, IVersionTagRepository } from "../../application";


export class KeyvVersionTagRepository extends KeyvAggregateRootRepository<VersionTagAggregateRootState, VersionTagAggregateRootState> implements IVersionTagRepository {
    protected purgeData({
        id,
        identifier,
        version,
        tag
    }: VersionTagAggregateRootState): VersionTagAggregateRootState {
        return {
            id,
            identifier,
            version,
            tag
        };
    }
}
