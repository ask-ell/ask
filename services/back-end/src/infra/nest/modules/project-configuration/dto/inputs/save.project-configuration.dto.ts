import { ApiProperty } from "@nestjs/swagger"

import type { ISaveProjectConfigurationDTO, IFileDTO, ITaskDTO, IToolDTO, ILoginCredentialsDTO } from '@ask/back-end-api';

import { FileDTO } from "../../../../dto/outputs/file.dto";
import { TaskDTO } from "../../../../dto/outputs/task.dto";
import { ToolDTO } from "../../../../dto/outputs/tool.dto";


export class SaveProjectConfigurationDTO implements ISaveProjectConfigurationDTO {
    @ApiProperty()
    id!: string;

    creator!: ILoginCredentialsDTO;

    @ApiProperty({
        required: false
    })
    public?: boolean;
    
    @ApiProperty({
        required: false
    })
    description?: string;

    @ApiProperty({
        type: [FileDTO],
        required: false
    })
    files?: IFileDTO[];

    @ApiProperty({
        type: [TaskDTO],
        required: false
    })
    tasks?: ITaskDTO[];

    @ApiProperty({
        type: [ToolDTO],
        required: false
    })
    tools?: IToolDTO[];
}
