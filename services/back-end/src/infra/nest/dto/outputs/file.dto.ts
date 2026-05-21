import { ApiProperty } from '@nestjs/swagger';

import type { IFileDTO } from '@ask/back-end-api';

import { IFileState } from '../../../../application';


export class FileDTO implements IFileDTO {
    @ApiProperty()
    path!: string;

    @ApiProperty()
    instructions!: string[];

    static create({
        path,
        instructions
    }: IFileState): IFileDTO {
        const dto: IFileDTO = new FileDTO();
        dto.path = path;
        dto.instructions = instructions;
        return dto;
    }
}