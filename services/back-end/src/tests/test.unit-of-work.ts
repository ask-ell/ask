import Keyv from "keyv";

import { IUnitOfWork, ProjectConfigurationAggregateRootState, UnitOfWork } from "../application";
import { KeyvProjectConfigurationProvider, KeyvProjectConfigurationRepository, KeyvVersionTagProvider, KeyvVersionTagRepository } from "../infra/keyv";


export class TestUnitOfWork extends UnitOfWork implements IUnitOfWork {
    constructor() {
        super();
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
    }
}
