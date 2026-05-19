import { Controller, Get, Query } from '@nestjs/common';

import type { IProjectConfigurationController, IProjectConfigurationDTO } from '@ask/back-end-api';

import { ProjectConfigurationService } from './project-configuration.service';
import { FindOneProjectConfigurationDTO } from './dto/inputs/find.one.project-configuration.dto';


@Controller('project-configurations')
export class ProjectConfigurationController implements IProjectConfigurationController {
    constructor(
        private projectConfigurationService: ProjectConfigurationService
    ) {}

    @Get('one')
    findOne(
        @Query()
        dto: FindOneProjectConfigurationDTO
    ): Promise<IProjectConfigurationDTO> {
        return this.projectConfigurationService.findOne(dto);
    }
}
