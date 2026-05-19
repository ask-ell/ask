import { IProjectConfigurationProvider, IProjectConfigurationRepository } from "../project-configuration";


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
