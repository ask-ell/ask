import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import type { IProjectConfigurationDTO } from '@ask/back-end-api';

import { ProjectConfigurationService } from './project-configuration.service';
import { FindOneProjectConfigurationDTO } from './dto/inputs/find.one.project-configuration.dto';
import { LoginCredentialsDTO } from '../../dto/inputs/login-credentials.dto';
import { SaveProjectConfigurationDTO } from './dto/inputs/save.project-configuration.dto';
import { ProjectConfigurationDTO } from './dto/outputs/project-configuration.dto';


@ApiTags('Project Configurations')
@Controller('project-configurations')
export class ProjectConfigurationController {
    constructor(
        private projectConfigurationService: ProjectConfigurationService
    ) {}

    @ApiResponse({
        type: ProjectConfigurationDTO
    })
    @Get(':projectConfigurationId')
    findOne(
        @Param('projectConfigurationId')
        projectConfigurationId: string,
        @Query()
        dto: FindOneProjectConfigurationDTO,
    ): Promise<IProjectConfigurationDTO> {
        dto.id = projectConfigurationId;
        return this.projectConfigurationService.findOne(dto);
    }

    @ApiResponse({
        type: ProjectConfigurationDTO
    })
    @Post()
    save(
        @Query() creator: LoginCredentialsDTO,
        @Body() dto: SaveProjectConfigurationDTO,
    ): Promise<IProjectConfigurationDTO> {
        dto.creator = creator;
        return this.projectConfigurationService.save(dto);
    }
}
