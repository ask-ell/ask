import { KeyvAggregateRootRepository } from "@ask-ell/keyv";

import { IProjectConfigurationDTO } from "@ask/back-end-api";


export class KeyvProjectConfigurationRepository extends KeyvAggregateRootRepository<IProjectConfigurationDTO, IProjectConfigurationDTO> {
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
