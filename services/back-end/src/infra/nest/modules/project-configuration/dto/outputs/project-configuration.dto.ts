import { ApiProperty } from '@nestjs/swagger';

import type { IProjectConfigurationDTO, IFileDTO } from '@ask/back-end-api';

import { ProjectConfigurationAggregateRootState } from '../../../../../../application';
import { FileDTO } from '../../../../dto/outputs/file.dto';


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

    // tasks?: ITaskDTO[];
    // tools?: IToolDTO[];

    static create({
        identifier,
        description,
        version,
        public: isPublic,
        files
    }: ProjectConfigurationAggregateRootState): IProjectConfigurationDTO {
        const dto: IProjectConfigurationDTO = new ProjectConfigurationDTO();
        dto.id = identifier;
        dto.type = "project-configuration";
        dto.public = isPublic;
        dto.description = description;
        dto.version = version;
        dto.files = files?.map(FileDTO.create);
        return dto;
    }
}