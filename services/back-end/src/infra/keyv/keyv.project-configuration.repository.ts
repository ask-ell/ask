import { KeyvAggregateRootRepository } from "@ask-ell/keyv";

import { IProjectConfigurationState, ProjectConfigurationAggregateRootState } from "../../application";


export class KeyvProjectConfigurationRepository extends KeyvAggregateRootRepository<IProjectConfigurationState, ProjectConfigurationAggregateRootState> {
    override async save(entityState: IProjectConfigurationState): Promise<ProjectConfigurationAggregateRootState> {
        await this.instance.set(entityState.version, entityState);
        return entityState;
    }

    protected override purgeData({
        id,
        version,
        description,
        public: _public,
        files,
        tools,
        tasks
    }: ProjectConfigurationAggregateRootState): ProjectConfigurationAggregateRootState {
        return {
            id,
            version,
            description,
            public: _public,
            files,
            tools,
            tasks
        };
    }
}
