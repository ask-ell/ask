import { KeyvAggregateRootRepository } from "@ask-ell/keyv";

import { IProjectConfigurationRepository, IProjectConfigurationState } from "../../application";


export class KeyvProjectConfigurationRepository extends KeyvAggregateRootRepository<IProjectConfigurationState, IProjectConfigurationState> implements IProjectConfigurationRepository {
    override async save(entityState: IProjectConfigurationState): Promise<IProjectConfigurationState> {
        await this.instance.set(entityState.id, entityState);
        return entityState;
    }

    protected override purgeData({
        id,
        version,
        description,
        public: isPublic,
        files,
        tools,
        tasks
    }: IProjectConfigurationState): IProjectConfigurationState {
        return {
            id,
            version,
            description,
            public: isPublic,
            files,
            tools,
            tasks
        };
    }
}
