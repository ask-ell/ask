import { Injectable, NotFoundException } from "@nestjs/common";

import { Id, IProjectConfigurationDTO } from "@ask/back-end-api";


@Injectable()
export class ProjectConfigurationService {
    findOne(projectConfigurationId: Id): Promise<IProjectConfigurationDTO> {
        throw new NotFoundException();
    }
}
