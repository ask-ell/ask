import { KeyvAggregateRootRepository } from "@ask-ell/keyv";

import { IProjectConfigurationRepository, ProjectConfigurationAggregateRootState } from "../../application";


export class KeyvProjectConfigurationRepository extends KeyvAggregateRootRepository<ProjectConfigurationAggregateRootState, ProjectConfigurationAggregateRootState> implements IProjectConfigurationRepository {
    override async save(entityState: ProjectConfigurationAggregateRootState): Promise<ProjectConfigurationAggregateRootState> {
        // TODO: move in @ask-ell/core ?
        if(!entityState.id){
            return super.save(entityState);
        }
        await this.instance.set(entityState.id, entityState);
        return entityState;
    }

    protected override purgeData({
        id,
        identifier,
        version,
        description,
        public: isPublic,
        files,
        tools,
        tasks
    }: ProjectConfigurationAggregateRootState): ProjectConfigurationAggregateRootState {
        return {
            id,
            identifier,
            version,
            description,
            public: isPublic,
            files,
            tools,
            tasks
        };
    }
}
