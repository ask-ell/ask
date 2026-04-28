import { Global, Module } from '@nestjs/common';
import { ApplicationBase } from '@ask-ell/back-end';

import { ProjectModule } from './modules';


@Global()
@Module({
  imports: [ProjectModule]
})
export class AppModule extends ApplicationBase {}
