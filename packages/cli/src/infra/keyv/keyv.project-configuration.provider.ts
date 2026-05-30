import { MaybeUndefined } from "@ask-ell/core";
import { KeyvAggregateRootProvider } from "@ask-ell/keyv";

import { IProjectConfigurationProvider, IProjectConfigurationState, IProjectConfigurationPartialState } from "../../application";


export class KeyvProjectConfigurationProvider extends KeyvAggregateRootProvider<IProjectConfigurationState, IProjectConfigurationState> implements IProjectConfigurationProvider {
    async findOneFromPartialState({
        id,
        version
    }: IProjectConfigurationPartialState): Promise<MaybeUndefined<IProjectConfigurationState>> {
        for await (const projectConfiguration of this.getAllDataGenerator()) {
            if (id === projectConfiguration.id) {
                if(version && version !== projectConfiguration.version) {
                    return undefined;
                }
                return projectConfiguration;
            }
        }

        return undefined;
    }
}
