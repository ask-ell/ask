import { Module } from '@nestjs/common';
import { ApplicationBase } from '@ask-ell/back-end';

import { ProjectModule } from './modules';


@Module({
  imports: [ProjectModule]
})
export class AppModule extends ApplicationBase {}
