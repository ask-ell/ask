import { MaybeUndefined } from "@ask-ell/core";

import { ISaveProjectConfigurationUseCase, SaveProjectConfigurationUseCaseInput } from "../../ports/driving/use-cases/project-configuration/save.project-configuration.use-case.interface";
import { ProjectConfigurationAggregateRootState } from "../../ports/driving/use-cases/project-configuration/types";
import { IUnitOfWork } from '../../unit-of-work/unit-of-work.interface'
import { ProjectConfiguration } from '../../domain/entities/project-configuration/project-configuration';
import { IProjectConfiguration } from "../../domain/entities/project-configuration/project-configuration.interface";
import { VersionTagAggregateRootState } from "../../ports/types";


export class SaveProjectConfigurationUseCase implements ISaveProjectConfigurationUseCase {
    constructor(
        private unitOfWork: IUnitOfWork
    ){}

    async run(input: SaveProjectConfigurationUseCaseInput): Promise<ProjectConfigurationAggregateRootState> {
        const version: string = new Date().getTime().toString()
        const projectConfiguration: IProjectConfiguration = new ProjectConfiguration({
            ...input,
            id: `${input.identifier}:${version}`,
            version
        });

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
