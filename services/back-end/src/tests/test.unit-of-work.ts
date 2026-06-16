import Keyv from "keyv";

import { IUnitOfWork, ProjectConfigurationAggregateRootState, UnitOfWork } from "../application";
import { KeyvProjectConfigurationProvider, KeyvProjectConfigurationRepository, KeyvUserProvider, KeyvUserRepository, KeyvVersionTagProvider, KeyvVersionTagRepository } from "../infra/keyv";
import { CryptoPasswordManager } from "../infra/node";


export class TestUnitOfWork extends UnitOfWork implements IUnitOfWork {
    constructor() {
        super();
        this.passwordManager = new CryptoPasswordManager();

        const projectConfigurationKeyvInstance: Keyv<ProjectConfigurationAggregateRootState> = new Keyv({
            namespace: 'project-configuration'
        });
        this.projectConfigurationProvider = new KeyvProjectConfigurationProvider(projectConfigurationKeyvInstance);
        this.projectConfigurationRepository = new KeyvProjectConfigurationRepository(projectConfigurationKeyvInstance);

        const versionTagKeyvInstance: Keyv = new Keyv({
            namespace: 'version-tag'
        });
        this.versionTagProvider = new KeyvVersionTagProvider(versionTagKeyvInstance);
        this.versionTagRepository = new KeyvVersionTagRepository(versionTagKeyvInstance);
        
        const userKeyvInstance: Keyv = new Keyv({
            namespace: 'user'
        });

        this.userProvider = new KeyvUserProvider(userKeyvInstance, this.passwordManager);
        this.userRepository = new KeyvUserRepository(userKeyvInstance);
    }
}
