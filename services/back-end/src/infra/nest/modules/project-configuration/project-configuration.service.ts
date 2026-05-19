import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { MaybeUndefined } from "@ask-ell/core";

import { Id, IProjectConfigurationDTO } from "@ask/back-end-api";

import type { IUnitOfWork } from "../../../../shared/unit-of-work";
import { UNIT_OF_WORK_PROVIDER } from "../../config/providers"


@Injectable()
export class ProjectConfigurationService {
    constructor(
        @Inject(UNIT_OF_WORK_PROVIDER)
        private unitOfWork: IUnitOfWork
    ){}

    async findOne(projectConfigurationId: Id): Promise<IProjectConfigurationDTO> {
        const projectConfiguration: MaybeUndefined<IProjectConfigurationDTO> = await this.unitOfWork.getProjectConfigurationProvider().findOneById(projectConfigurationId);
        if(!projectConfiguration){
            throw new NotFoundException();
        }

        if(!projectConfiguration.public){ // TODO: move in application module
            throw new NotFoundException();
        }

        return projectConfiguration;
    }
}
