import { MaybeUndefined } from "@ask-ell/core";
import { KeyvAggregateRootProvider } from "@ask-ell/keyv";

import { IProjectConfigurationProvider, IProjectConfigurationState, ProjectConfigurationAggregateRootState } from "../../application";


export class KeyvProjectConfigurationProvider extends KeyvAggregateRootProvider<IProjectConfigurationState, ProjectConfigurationAggregateRootState> implements IProjectConfigurationProvider {
    async findOneByIdentifier(identifier: string): Promise<MaybeUndefined<ProjectConfigurationAggregateRootState>> {
        for await (const projectConfigurationState of this.getAllDataGenerator()){
            if (projectConfigurationState.identifier === identifier) {
                return projectConfigurationState;
            }
        }
        return undefined;
    }
}
