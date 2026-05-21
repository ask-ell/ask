import { ApiProperty } from "@nestjs/swagger";

import type { IToolDTO } from '@ask/back-end-api';

import { IToolState } from "../../../../application";


export class ToolDTO implements IToolDTO {
    @ApiProperty()
    name!: string;

    @ApiProperty()
    url!: string;

    static create({
        name,
        url
    }: IToolState): IToolDTO {
        const dto: IToolDTO = new ToolDTO();
        dto.name = name;
        dto.url = url;
        return dto;
    }
}
