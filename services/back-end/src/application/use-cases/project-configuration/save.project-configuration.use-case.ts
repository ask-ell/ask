import { MaybeUndefined } from "@ask-ell/core";
import { Id } from "@ask-ell/core/dist/src/ddd";

import { ISaveProjectConfigurationUseCase, SaveProjectConfigurationUseCaseInput } from "../../ports/driving/use-cases/project-configuration/save.project-configuration.use-case.interface";
import { ProjectConfigurationAggregateRootState } from "../../ports/driving/use-cases/project-configuration/types";
import { IUnitOfWork } from '../../unit-of-work/unit-of-work.interface'
import { ProjectConfiguration } from '../../domain/entities/project-configuration/project-configuration';
import { IProjectConfiguration } from "../../domain/entities/project-configuration/project-configuration.interface";
import { VersionTagAggregateRootState } from "../../ports/types";
import { DuplicatedProjectConfigurationError } from "../../errors/duplicated-project-configuration.error";


export class SaveProjectConfigurationUseCase implements ISaveProjectConfigurationUseCase {
    constructor(
        private unitOfWork: IUnitOfWork
    ){}

    async run(input: SaveProjectConfigurationUseCaseInput): Promise<ProjectConfigurationAggregateRootState> {
        const version: string = new Date().getTime().toString();
        const id: Id = `${input.identifier}:${version}`;
        const projectConfiguration: IProjectConfiguration = new ProjectConfiguration({
            ...input,
            id,
            version
        });

        const existingProjectConfigurationState: MaybeUndefined<ProjectConfigurationAggregateRootState> = await this.unitOfWork
            .getProjectConfigurationProvider()
            .findOneByIdentifier(input.identifier);

        if(existingProjectConfigurationState){
            const existingProjectConfiguration: IProjectConfiguration = new ProjectConfiguration(existingProjectConfigurationState);
            if(projectConfiguration.isEqual(existingProjectConfiguration)){
                throw new DuplicatedProjectConfigurationError(input.identifier);
            }
        }

        const snapshot: ProjectConfigurationAggregateRootState = projectConfiguration.getSnapshot();
        await this.unitOfWork.getProjectConfigurationRepository().save(snapshot);

        let latestVersionTagState: MaybeUndefined<VersionTagAggregateRootState> = await this.unitOfWork
            .getVersionTagProvider()
            .findOneByTagAndIdentifier({
                identifier: input.identifier,
                tag: 'latest'
            });

        if(!!latestVersionTagState){
            await this.unitOfWork.getVersionTagRepository().updateOne({
                ...latestVersionTagState,
                version
            });
        } else {
            await this.unitOfWork.getVersionTagRepository().save({
                identifier: input.identifier,
                version,
                tag: 'latest'
            });
        }

        return snapshot;
    }
}
