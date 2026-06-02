import Keyv from "keyv";

import { KeyvStoreAdapterFactory } from "@ask-ell/back-end";

import { IUnitOfWork, ProjectConfigurationAggregateRootState, UnitOfWork } from "../../application";
import { KeyvProjectConfigurationProvider, KeyvProjectConfigurationRepository, KeyvVersionTagProvider, KeyvVersionTagRepository } from "../keyv";


export class FullStackUnitOfWork extends UnitOfWork implements IUnitOfWork {
    constructor(
        keyvStoreAdapterFactory: KeyvStoreAdapterFactory
    ) {
        super();
        const projectConfigurationKeyvInstance: Keyv<ProjectConfigurationAggregateRootState> = new Keyv({
            namespace: 'project-configuration',
            store: keyvStoreAdapterFactory.create({
                databaseRelativePath: "tmp/ask.sqlite",
                postgresUri: ''
            }),
        });
        this.projectConfigurationProvider = new KeyvProjectConfigurationProvider(projectConfigurationKeyvInstance);
        this.projectConfigurationRepository = new KeyvProjectConfigurationRepository(projectConfigurationKeyvInstance);

        const versionTagKeyvInstance: Keyv = new Keyv({
            namespace: 'version-tag',
            store: keyvStoreAdapterFactory.create({
                databaseRelativePath: "tmp/ask.sqlite",
                postgresUri: ''
            })
        });
        this.versionTagProvider = new KeyvVersionTagProvider(versionTagKeyvInstance);
        this.versionTagRepository = new KeyvVersionTagRepository(versionTagKeyvInstance);
    }
}
