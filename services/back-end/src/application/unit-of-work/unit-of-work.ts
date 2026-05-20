import { IProjectConfigurationProvider } from "../ports/driven/project-configuration/project-configuration.provider.interface";
import { IProjectConfigurationRepository } from "../ports/driven/project-configuration/project-configuration.repository.interface";
import { IVersionTagProvider } from "../ports/driven/version-tag/version-tag.provider.interface";
import { IVersionTagRepository } from "../ports/driven/version-tag/version-tag.repository.interface";
import { IUnitOfWork } from "./unit-of-work.interface";


export class UnitOfWork implements IUnitOfWork {
    protected projectConfigurationProvider!: IProjectConfigurationProvider;
    protected projectConfigurationRepository!: IProjectConfigurationRepository;
    protected versionTagProvider!: IVersionTagProvider;
    protected versionTagRepository!: IVersionTagRepository;

    getProjectConfigurationProvider(): IProjectConfigurationProvider {
        if(!this.projectConfigurationProvider) {
            throw new Error("Project configuration provider not initialized");
        }
        return this.projectConfigurationProvider;
    }

    getProjectConfigurationRepository(): IProjectConfigurationRepository {
        if(!this.projectConfigurationRepository) {
            throw new Error("Project configuration repository not initialized");
        }
        return this.projectConfigurationRepository;
    }

    getVersionTagProvider(): IVersionTagProvider {
        if(!this.versionTagProvider) {
            throw new Error("Version tag provider not initialized");
        }
        return this.versionTagProvider;
    }

    getVersionTagRepository(): IVersionTagRepository {
        if(!this.versionTagRepository) {
            throw new Error("Version tag repository not initialized");
        }
        return this.versionTagRepository;
    }
}
