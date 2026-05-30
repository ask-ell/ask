import { IProjectConfigurationProvider } from "../ports/driven/project-configuration/project-configuration.provider.interface";
import { IProjectConfigurationRepository } from "../ports/driven/project-configuration/project-configuration.repository.interface";
import { IUnitOfWork } from "./unit-of-work.interface";


export class UnitOfWork implements IUnitOfWork {
    protected projectConfigurationProvider!: IProjectConfigurationProvider;
    protected projectConfigurationRepository!: IProjectConfigurationRepository;

    getProjectConfigurationProvider(): IProjectConfigurationProvider {
        if(!this.projectConfigurationProvider) {
            throw new Error("Project configuration provider must be setted in constructor");
        }

        return this.projectConfigurationProvider;
    }

    getProjectConfigurationRepository(): IProjectConfigurationRepository {
        if(!this.projectConfigurationRepository) {
            throw new Error("Project configuration repository must be setted in constructor");
        }

        return this.projectConfigurationRepository;
    }
}
