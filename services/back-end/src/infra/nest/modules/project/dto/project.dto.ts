import { ApiProperty } from '@nestjs/swagger';

import { Id, IProjectDTO, ITaskDTO } from '@ask/back-end-api';

import { TaskDTO } from './task.dto';


export class ProjectDTO implements IProjectDTO {
    @ApiProperty()
    id!: Id;

    @ApiProperty()
    type!: 'project';

    @ApiProperty()
    configuration!: Id;

    @ApiProperty({ required: false, type: () => [TaskDTO] })
    tasks?: ITaskDTO[];
}
