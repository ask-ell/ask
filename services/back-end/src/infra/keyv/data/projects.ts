import { IProjectDTO } from "@ask/back-end-api";


export const askProject: IProjectDTO = {
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
