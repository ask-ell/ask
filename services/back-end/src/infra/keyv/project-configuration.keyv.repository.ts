import Keyv from "keyv";
import { KeyvAggregateRootRepository } from "@ask-ell/keyv";

import { IProjectConfigurationDTO } from "@ask-ell/ask-back-end-api";

import { nxProjectConfiguration } from "./data/project-configurations";


export class ProjectConfigurationKeyvRepository extends KeyvAggregateRootRepository<IProjectConfigurationDTO, IProjectConfigurationDTO> {
    constructor(instance: Keyv<IProjectConfigurationDTO>) {
        super(instance);
        this.instance.set(nxProjectConfiguration.id, nxProjectConfiguration);
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
        }
    }
}
