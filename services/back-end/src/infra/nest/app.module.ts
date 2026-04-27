import { Module } from '@nestjs/common';

import { ProjectModule } from './modules';


@Module({
  imports: [ProjectModule]
})
export class AppModule {}
