import Keyv from "keyv";
import { KeyvAggregateRootRepository } from "@ask-ell/keyv";

import { IProjectConfigurationDTO } from "@ask/back-end-api";

import { nxProjectConfiguration } from "./data";


export class KeyvProjectConfigurationRepository extends KeyvAggregateRootRepository<IProjectConfigurationDTO, IProjectConfigurationDTO> {
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
