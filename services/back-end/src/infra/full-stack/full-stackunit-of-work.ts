import Keyv, { KeyvStoreAdapter } from "keyv";

import { KeyvStoreAdapterFactory } from "@ask-ell/back-end";

import { IUnitOfWork, UnitOfWork } from "../../shared/unit-of-work";
import { KeyvProjectConfigurationProvider, KeyvProjectConfigurationRepository, KeyvProjectProvider, KeyvProjectRepository } from "../keyv";


export class FullStackUnitOfWork extends UnitOfWork implements IUnitOfWork {
    constructor() {
        super();
        const store: KeyvStoreAdapter = new KeyvStoreAdapterFactory().create({
            databaseRelativePath: "tmp/ask.sqlite",
            postgresUri: ''
        });

        const instance: Keyv = new Keyv({ store });
        this.projectProvider = new KeyvProjectProvider(instance);
        this.projectRepository = new KeyvProjectRepository(instance);
        this.projectConfigurationProvider = new KeyvProjectConfigurationProvider(instance);
        this.projectConfigurationRepository = new KeyvProjectConfigurationRepository(instance);
    }
}
