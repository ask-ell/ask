import { ApiProperty } from '@nestjs/swagger';

import type { ILoginCredentialsDTO } from '@ask/back-end-api';


export class LoginCredentialsDTO implements ILoginCredentialsDTO {
    @ApiProperty()
    username!: string;

    @ApiProperty()
    password!: string;
}
