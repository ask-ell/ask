import { Controller, Get, Param } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger"

import { IProjectController, IProjectDTO } from "@ask-ell/ask-back-end-api";

import { ProjectService } from "./project.service";
import { ProjectDTO } from "./dto/project.dto";


@Controller('projects')
export class ProjectController implements IProjectController {
    constructor(
        private projectService: ProjectService
    ){}

    @ApiResponse({
        type: ProjectDTO
    })
    @Get(':projectId')
    findOne(
        @Param('projectId')
        projectId: string
    ): Promise<IProjectDTO> {
        return this.projectService.findOne(projectId);
    }
}