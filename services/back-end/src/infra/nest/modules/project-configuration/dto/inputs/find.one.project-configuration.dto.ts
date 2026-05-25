import { ApiProperty } from "@nestjs/swagger"

import type { IFindOneProjectConfigurationDTO } from '@ask/back-end-api';


export class FindOneProjectConfigurationDTO implements IFindOneProjectConfigurationDTO {
    id!: string;

    @ApiProperty({
        required: false
    })
    version?: string;
}
