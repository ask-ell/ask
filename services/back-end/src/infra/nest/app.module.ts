import { Global, Module } from '@nestjs/common';
import { ApplicationBase } from '@ask-ell/back-end';

import { ProjectConfigurationModule } from './modules/project-configuration';


@Global()
@Module({
    imports: [ProjectConfigurationModule]
})
export class AppModule extends ApplicationBase {}
