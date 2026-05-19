import { Module } from '@nestjs/common';

import { ProjectConfigurationController } from './project-configuration.controller';
import { ProjectConfigurationService } from './project-configuration.service';


@Module({
    controllers: [ProjectConfigurationController],
    providers: [ProjectConfigurationService]
})
export class ProjectConfigurationModule {}
