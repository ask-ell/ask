import { IProjectConfigurationProvider, IProjectConfigurationRepository } from "../project-configuration";


export interface IUnitOfWork {
    getProjectConfigurationProvider(): IProjectConfigurationProvider;
    getProjectConfigurationRepository(): IProjectConfigurationRepository;
}
