import { Injectable } from "@nestjs/common";

import { IProjectDTO } from "@ask-ell/ask-back-end-api";


@Injectable()
export class ProjectService {
    async findOne(projectId: string): Promise<IProjectDTO> {
        await Promise.resolve();
        return {
            id: 'ask-ell_governance_ask',
            type: 'project',
            configuration: 'nx',
            tasks: [
                {
                    id: 'post:install',
                    description: "post install task",
                    instructions: [
                        '@ask build:cli'
                    ]
                },
                {
                    id: 'build:cli',
                    description: "build the CLI",
                    instructions: [
                        './node_modules/.bin/nx build cli',
                        'mkdir -p tmp/ask'
                    ]
                }
            ]
        };
    }
}