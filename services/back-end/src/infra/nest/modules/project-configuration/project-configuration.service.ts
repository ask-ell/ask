import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { MaybeUndefined } from "@ask-ell/core";

import type { IProjectConfigurationDTO, IFindOneProjectConfigurationDTO, IProjectConfigurationController, ISaveProjectConfigurationDTO } from "@ask/back-end-api";

import type { IFindOneProjectConfigurationUseCase, ISaveProjectConfigurationUseCase, ProjectConfigurationAggregateRootState } from "../../../../application";
import { FIND_ONE_PROJECT_CONFIGURATION_USE_CASE, SAVE_PROJECT_CONFIGURATION_USE_CASE } from "../../config/providers"
import { ProjectConfigurationDTO } from "./dto/outputs/project-configuration.dto";


@Injectable()
export class ProjectConfigurationService implements IProjectConfigurationController {
    constructor(
        @Inject(FIND_ONE_PROJECT_CONFIGURATION_USE_CASE)
        private findOneProjectConfigurationUseCase: IFindOneProjectConfigurationUseCase,
        @Inject(SAVE_PROJECT_CONFIGURATION_USE_CASE)
        private saveProjectConfigurationUseCase: ISaveProjectConfigurationUseCase,
    ){}

    async findOne({
        id,
        version
    }: IFindOneProjectConfigurationDTO): Promise<IProjectConfigurationDTO> {
        const projectConfiguration: MaybeUndefined<ProjectConfigurationAggregateRootState> = await this.findOneProjectConfigurationUseCase.run({
            version,
            identifier: id
        });

        if(!projectConfiguration){
            throw new NotFoundException();
        }

        return ProjectConfigurationDTO.create(projectConfiguration);
    }

    async save(dto: ISaveProjectConfigurationDTO): Promise<IProjectConfigurationDTO> {
        const projectConfiguration: ProjectConfigurationAggregateRootState = await this.saveProjectConfigurationUseCase.run({
            ...dto,
            identifier: dto.id
        });
        return ProjectConfigurationDTO.create(projectConfiguration);
    }
}
