import { ISaveProjectConfigurationUseCase, SaveProjectConfigurationUseCaseInput } from "../../ports/driving/use-cases/project-configuration/save.project-configuration.use-case.interface";
import { ProjectConfigurationAggregateRootState } from "../../ports/driving/use-cases/project-configuration/types";
import { IUnitOfWork } from '../../unit-of-work/unit-of-work.interface'
import { ProjectConfiguration } from '../../domain/entities/project-configuration/project-configuration';
import { IProjectConfiguration } from "../../domain/entities/project-configuration/project-configuration.interface";


export class SaveProjectConfigurationUseCase implements ISaveProjectConfigurationUseCase {
    constructor(
        private unitOfWork: IUnitOfWork
    ){}

    run(input: SaveProjectConfigurationUseCaseInput): Promise<ProjectConfigurationAggregateRootState> {
        const version: string = new Date().getTime().toString()
        const projectConfiguration: IProjectConfiguration = new ProjectConfiguration({
            ...input,
            id: `${input.identifier}:${version}`,
            version
        });
        return this.unitOfWork.getProjectConfigurationRepository().save(projectConfiguration.getSnapshot());
    }
}
