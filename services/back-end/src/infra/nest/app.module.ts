import { Global, Module } from '@nestjs/common';
import { ApplicationBase } from '@ask-ell/back-end';

import { FixtureModule, ProjectConfigurationModule } from './modules';


@Global()
@Module({
    imports: [ProjectConfigurationModule, FixtureModule]
})
export class AppModule extends ApplicationBase {}
