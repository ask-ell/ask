import { IProject, IProjectConfiguration } from "./types";


export const nxProjectConfiguration: IProjectConfiguration = {
    id: 'nx',
    name: 'Nx',
    description: 'Nx is a set of extensible dev tools for monorepos, which helps you develop like Google, Facebook, and Microsoft.',
    tasks: [
        {
            id: 'serve',
            description: "Run services in development mode",
            instructions: [
                'npm run nx run-many -t serve'
            ]
        }
    ]
}


export const fakeProject: IProject = {
    id: 'fake',
    configuration: 'nx',
    tasks: [
        {
            id: 'serve',
            description: "Say hello",
            instructions: [
                'echo "Hello, World!"'
            ]
        }
    ]
};
