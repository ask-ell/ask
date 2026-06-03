import { ApiProperty } from '@nestjs/swagger';

import type { ITaskDTO } from '@ask/back-end-api';

import { ITaskState } from '../../../../application';


export class TaskDTO implements ITaskDTO {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    instructions!: string[];

    @ApiProperty({
        required: false
    })
    description?: string;

    @ApiProperty({
        required: false
    })
    files?: string[];

    static create({
        id,
        instructions,
        description,
        files
    }: ITaskState): ITaskDTO {
        const dto: ITaskDTO = new TaskDTO();
        dto.id = id;
        dto.instructions = instructions;
        dto.description = description;
        dto.files = files;
        return dto;
    }
}
