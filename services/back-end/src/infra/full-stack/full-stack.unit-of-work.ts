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

        const keyv: Keyv = new Keyv({ store });
        this.projectProvider = new KeyvProjectProvider(keyv);
        this.projectRepository = new KeyvProjectRepository(keyv);
        this.projectConfigurationProvider = new KeyvProjectConfigurationProvider(keyv);
        this.projectConfigurationRepository = new KeyvProjectConfigurationRepository(keyv);
    }
}
