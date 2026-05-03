import { ApiProperty } from "@nestjs/swagger";

import { ITaskDTO } from "@ask/back-end-api";


export class TaskDTO implements ITaskDTO {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    description!: string;

    @ApiProperty()
    instructions!: string[];

    @ApiProperty({ required: false })
    files?: string[];
}