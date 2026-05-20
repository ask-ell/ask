import { IProjectConfigurationProvider } from "../ports/driven/project-configuration/project-configuration.provider.interface";
import { IProjectConfigurationRepository } from "../ports/driven/project-configuration/project-configuration.repository.interface";


export interface IUnitOfWork {
    getProjectConfigurationProvider(): IProjectConfigurationProvider;
    getProjectConfigurationRepository(): IProjectConfigurationRepository;
}
