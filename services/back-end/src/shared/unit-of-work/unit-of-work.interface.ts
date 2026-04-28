import { IProjectProvider, IProjectRepository } from "../project";
import { IProjectConfigurationProvider, IProjectConfigurationRepository } from "../project-configuration";


export interface IUnitOfWork {
    getProjectProvider(): IProjectProvider;
    getProjectConfigurationProvider(): IProjectConfigurationProvider;
    getProjectRepository(): IProjectRepository;
    getProjectConfigurationRepository(): IProjectConfigurationRepository;
}