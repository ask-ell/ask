import { IProjectConfigurationProvider } from "../ports/driven/project-configuration/project-configuration.provider.interface";
import { IProjectConfigurationRepository } from "../ports/driven/project-configuration/project-configuration.repository.interface";


export class UnitOfWork {
    protected projectConfigurationProvider!: IProjectConfigurationProvider;
    protected projectConfigurationRepository!: IProjectConfigurationRepository;

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
}
