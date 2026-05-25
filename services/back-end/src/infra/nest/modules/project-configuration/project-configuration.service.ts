import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { MaybeUndefined } from "@ask-ell/core";

import type { IProjectConfigurationDTO, IFindOneProjectConfigurationDTO, IProjectConfigurationController } from "@ask/back-end-api";

import type { IFindOneProjectConfigurationUseCase, ProjectConfigurationAggregateRootState } from "../../../../application";
import { FIND_ONE_PROJECT_CONFIGURATION_USE_CASE } from "../../config/providers"
import { ProjectConfigurationDTO } from "./dto/outputs/project-configuration.dto";


@Injectable()
export class ProjectConfigurationService implements IProjectConfigurationController {
    constructor(
        @Inject(FIND_ONE_PROJECT_CONFIGURATION_USE_CASE)
        private findOneProjectConfigurationUseCase: IFindOneProjectConfigurationUseCase
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
}
