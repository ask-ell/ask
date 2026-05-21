import { ApiProperty } from '@nestjs/swagger';

import type { IProjectConfigurationDTO, IFileDTO, ITaskDTO, IToolDTO } from '@ask/back-end-api';

import { ProjectConfigurationAggregateRootState } from '../../../../../../application';
import { FileDTO } from '../../../../dto/outputs/file.dto';
import { TaskDTO } from '../../../../dto/outputs/task.dto';
import { ToolDTO } from '../../../../dto/outputs/tool.dto';


export class ProjectConfigurationDTO implements IProjectConfigurationDTO {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    type!: "project-configuration";

    @ApiProperty()
    version?: string;

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

    static create({
        identifier,
        description,
        version,
        public: isPublic,
        files,
        tasks,
        tools
    }: ProjectConfigurationAggregateRootState): IProjectConfigurationDTO {
        const dto: IProjectConfigurationDTO = new ProjectConfigurationDTO();
        dto.id = identifier;
        dto.type = "project-configuration";
        dto.public = isPublic;
        dto.description = description;
        dto.version = version;
        dto.files = files?.map(FileDTO.create);
        dto.tasks = tasks?.map(TaskDTO.create);
        dto.tools = tools?.map(ToolDTO.create);
        return dto;
    }
}