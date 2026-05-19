import { Global, Module } from '@nestjs/common';
import { ApplicationBase } from '@ask-ell/back-end';


@Global()
@Module({})
export class AppModule extends ApplicationBase {}
