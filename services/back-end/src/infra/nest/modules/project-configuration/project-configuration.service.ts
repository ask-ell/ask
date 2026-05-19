import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { MaybeUndefined } from "@ask-ell/core";

import type { IProjectConfigurationDTO, IFindOneProjectConfigurationDTO } from "@ask/back-end-api";

import type { IUnitOfWork } from "../../../../shared/unit-of-work";
import { UNIT_OF_WORK_PROVIDER } from "../../config/providers"


@Injectable()
export class ProjectConfigurationService {
    constructor(
        @Inject(UNIT_OF_WORK_PROVIDER)
        private unitOfWork: IUnitOfWork
    ){}

    async findOne({
        id
    }: IFindOneProjectConfigurationDTO): Promise<IProjectConfigurationDTO> {
        // TODO: search by id and version
        const projectConfiguration: MaybeUndefined<IProjectConfigurationDTO> = await this.unitOfWork.getProjectConfigurationProvider().findOneById(id);
        if(!projectConfiguration){
            throw new NotFoundException();
        }

        if(!projectConfiguration.public){ // TODO: move in application module
            throw new NotFoundException();
        }

        return projectConfiguration;
    }
}
