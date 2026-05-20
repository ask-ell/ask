import { IProjectConfigurationProvider } from "../ports/driven/project-configuration/project-configuration.provider.interface";
import { IProjectConfigurationRepository } from "../ports/driven/project-configuration/project-configuration.repository.interface";
import { IVersionTagProvider } from "../ports/driven/version-tag/version-tag.provider.interface";
import { IVersionTagRepository } from "../ports/driven/version-tag/version-tag.repository.interface";


export interface IUnitOfWork {
    getProjectConfigurationProvider(): IProjectConfigurationProvider;
    getProjectConfigurationRepository(): IProjectConfigurationRepository;
    getVersionTagProvider(): IVersionTagProvider;
    getVersionTagRepository(): IVersionTagRepository;
}
