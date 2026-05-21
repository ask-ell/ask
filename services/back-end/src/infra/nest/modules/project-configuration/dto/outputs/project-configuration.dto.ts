import { ApiProperty } from '@nestjs/swagger';

import type { IProjectConfigurationDTO } from '@ask/back-end-api';
import { ProjectConfigurationAggregateRootState } from '../../../../../../application';


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

    // files?: IFileDTO[];
    // tasks?: ITaskDTO[];
    // tools?: IToolDTO[];

    static create({
        identifier,
        description,
        version,
        public: isPublic,
    }: ProjectConfigurationAggregateRootState): IProjectConfigurationDTO {
        const dto = new ProjectConfigurationDTO();
        dto.id = identifier;
        dto.public = isPublic;
        dto.description = description;
        dto.version = version;
        return dto;
    }
}