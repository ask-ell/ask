import { APP_INTERCEPTOR } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';
import { ApplicationBase } from '@ask-ell/back-end';

import { FixtureModule, ProjectConfigurationModule } from './modules';
import { ApplicationErrorInterceptor } from './interceptors';


@Global()
@Module({
    imports: [ProjectConfigurationModule, FixtureModule],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ApplicationErrorInterceptor,
        },
    ]
})
export class AppModule extends ApplicationBase {}
