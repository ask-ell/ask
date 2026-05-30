import Keyv from 'keyv';

import { IProjectConfigurationState, IUnitOfWork, UnitOfWork } from "../application";
import { KeyvProjectConfigurationProvider, KeyvProjectConfigurationRepository } from "../infra/keyv";


export class TestUnitOfWork extends UnitOfWork implements IUnitOfWork {
    constructor() {
        super();
        const keyvInstance: Keyv<IProjectConfigurationState> = new Keyv();
        this.projectConfigurationProvider = new KeyvProjectConfigurationProvider(keyvInstance);
        this.projectConfigurationRepository = new KeyvProjectConfigurationRepository(keyvInstance);
    }
}
