import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { Id, IProjectDTO } from "@ask-ell/ask-back-end-api";

import { UNIT_OF_WORK_PROVIDER } from "../../config/providers";
import type { IUnitOfWork } from "../../../../shared/unit-of-work";


@Injectable()
export class ProjectService {
    constructor(
        @Inject(UNIT_OF_WORK_PROVIDER)
        private unitOfWork: IUnitOfWork
    ) {}

    async findOne(projectId: Id): Promise<IProjectDTO> {
        const data = await this.unitOfWork.getProjectProvider().findOneById(projectId);
        if(!data) {
            throw new NotFoundException("Project not found");
        }
        return data;
    }
}
