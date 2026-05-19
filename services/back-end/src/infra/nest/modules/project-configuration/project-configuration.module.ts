import { Module } from '@nestjs/common';

import { ProjectConfigurationController } from './project-configuration.controller';


@Module({
    controllers: [ProjectConfigurationController]
})
export class ProjectConfigurationModule {}
