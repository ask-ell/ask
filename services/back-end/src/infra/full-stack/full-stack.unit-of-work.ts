import Keyv, { KeyvStoreAdapter } from "keyv";

import { KeyvStoreAdapterFactory } from "@ask-ell/back-end";

import { IUnitOfWork, ProjectConfigurationAggregateRootState, UnitOfWork } from "../../application";
import { KeyvProjectConfigurationProvider, KeyvProjectConfigurationRepository, KeyvVersionTagProvider, KeyvVersionTagRepository } from "../keyv";


export class FullStackUnitOfWork extends UnitOfWork implements IUnitOfWork {
    constructor() {
        super();
        const store: KeyvStoreAdapter = new KeyvStoreAdapterFactory().create({
            databaseRelativePath: "tmp/ask.sqlite",
            postgresUri: ''
        });
        const projectConfigurationKeyvInstance: Keyv<ProjectConfigurationAggregateRootState> = new Keyv({ store, namespace: 'project-configuration' });
        this.projectConfigurationProvider = new KeyvProjectConfigurationProvider(projectConfigurationKeyvInstance);
        this.projectConfigurationRepository = new KeyvProjectConfigurationRepository(projectConfigurationKeyvInstance);

        const versionTagKeyvInstance: Keyv = new Keyv({ store, namespace: 'version-tag' });
        this.versionTagProvider = new KeyvVersionTagProvider(versionTagKeyvInstance);
        this.versionTagRepository = new KeyvVersionTagRepository(versionTagKeyvInstance);
    }
}
