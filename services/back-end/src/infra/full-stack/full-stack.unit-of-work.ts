import Keyv, { KeyvStoreAdapter } from "keyv";

import { KeyvStoreAdapterFactory } from "@ask-ell/back-end";

import { IUnitOfWork, UnitOfWork } from "../../application";
import { KeyvProjectConfigurationProvider, KeyvProjectConfigurationRepository } from "../keyv";


export class FullStackUnitOfWork extends UnitOfWork implements IUnitOfWork {
    constructor() {
        super();
        const store: KeyvStoreAdapter = new KeyvStoreAdapterFactory().create({
            databaseRelativePath: "tmp/ask.sqlite",
            postgresUri: ''
        });
        const keyv: Keyv = new Keyv({ store });
        this.projectConfigurationProvider = new KeyvProjectConfigurationProvider(keyv);
        this.projectConfigurationRepository = new KeyvProjectConfigurationRepository(keyv);
    }
}
