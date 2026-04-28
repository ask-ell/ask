import { IProjectProvider, IProjectRepository } from "../project";
import { IProjectConfigurationProvider, IProjectConfigurationRepository } from "../project-configuration";


export class UnitOfWork {
    protected projectProvider!: IProjectProvider;
    protected projectConfigurationProvider!: IProjectConfigurationProvider;
    protected projectRepository!: IProjectRepository;
    protected projectConfigurationRepository!: IProjectConfigurationRepository;

    getProjectProvider(): IProjectProvider {
        if(!this.projectProvider) {
            throw new Error("Project provider not initialized");
        }
        return this.projectProvider;
    }

    getProjectConfigurationProvider(): IProjectConfigurationProvider {
        if(!this.projectConfigurationProvider) {
            throw new Error("Project configuration provider not initialized");
        }
        return this.projectConfigurationProvider;
    }

    getProjectRepository(): IProjectRepository {
        if(!this.projectRepository) {
            throw new Error("Project repository not initialized");
        }
        return this.projectRepository;
    }

    getProjectConfigurationRepository(): IProjectConfigurationRepository {
        if(!this.projectConfigurationRepository) {
            throw new Error("Project configuration repository not initialized");
        }
        return this.projectConfigurationRepository;
    }
}