import { MaybeUndefined } from "@ask-ell/core";
import { KeyvAggregateRootProvider } from "@ask-ell/keyv";

import { VersionTagAggregateRootState, IVersionTagProvider, FindOneByTagAndIdentifierDTO } from "../../application";


export class KeyvVersionTagProvider extends KeyvAggregateRootProvider<VersionTagAggregateRootState, VersionTagAggregateRootState> implements IVersionTagProvider {
    async findOneByTagAndIdentifier({
        identifier,
        tag
    }: FindOneByTagAndIdentifierDTO): Promise<MaybeUndefined<VersionTagAggregateRootState>> {
        for await (const versionTag of this.getAllDataGenerator()) {
            if(versionTag.tag === tag && versionTag.identifier === identifier) {
                return versionTag;
            }
        }
        return undefined;
    }
}
