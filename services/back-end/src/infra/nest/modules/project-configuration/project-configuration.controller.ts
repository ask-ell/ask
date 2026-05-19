import { Controller, Get, Param } from '@nestjs/common';

import type { IProjectConfigurationController, IProjectConfigurationDTO } from '@ask/back-end-api';

import { ProjectConfigurationService } from './project-configuration.service';


@Controller('project-configurations')
export class ProjectConfigurationController implements IProjectConfigurationController {
    constructor(
        private projectConfigurationService: ProjectConfigurationService
    ) {}

    @Get(':projectConfigurationId')
    findOne(
        @Param('projectConfigurationId')
        projectConfigurationId: string
    ): Promise<IProjectConfigurationDTO> {
        return this.projectConfigurationService.findOne(projectConfigurationId);
    }
}
