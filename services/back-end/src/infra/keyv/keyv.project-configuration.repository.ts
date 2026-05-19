import { KeyvAggregateRootRepository } from "@ask-ell/keyv";

import { IProjectConfigurationDTO } from "@ask/back-end-api";


export class KeyvProjectConfigurationRepository extends KeyvAggregateRootRepository<IProjectConfigurationDTO, IProjectConfigurationDTO> {
    override async save(entityState: IProjectConfigurationDTO): Promise<IProjectConfigurationDTO> {
        await this.instance.set(entityState.id, entityState);
        return entityState;
    }

    protected override purgeData({
        id,
        type,
        description,
        public: _public,
        files,
        tools,
        tasks
    }: IProjectConfigurationDTO): IProjectConfigurationDTO {
        return {
            id,
            type,
            description,
            public: _public,
            files,
            tools,
            tasks
        };
    }
}
