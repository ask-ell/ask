import { Controller, Get, Param } from "@nestjs/common";

import { ProjectService } from "./project.service";


@Controller('projects')
export class ProjectController {
    constructor(
        private projectService: ProjectService
    ){}

    @Get(':projectId')
    findOne(
        @Param('projectId')
        projectId: string
    ) {
        return this.projectService.findOne(projectId);
    }
}