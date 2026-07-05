import { ProjectConfigurationFixture } from "../../../../../../shared/fixtures";


export const nxProjectConfiguration: ProjectConfigurationFixture = {
    id: "nx",
    type: 'project-configuration',
    description: "Nx is a set of extensible dev tools for monorepos, which helps you develop like Google, Facebook, and Microsoft.",
    public: true,
    tools: [
        {
            name: "Node.js",
            url: "https://nodejs.org/"
        },
        {
            name: "NPM",
            url: "https://www.npmjs.com/"
        },
        {
            name: "Nx",
            url: "https://nx.dev/"
        },
        {
            name: "Docker",
            url: "https://docker.com/"
        }
    ],
    files: [
        {
            path: ".ask/secrets.json",
            instructions: ["cp -r .ask/secrets.sample.json .ask/secrets.json"]
        },
        {
            path: "tmp/last_install",
            instructions: ["@ask run install"]
        },
        {
            path: "tmp/last_build",
            instructions: ["@ask run build"]
        }
    ],
    tasks: [
        {
            id: "install",
            description: "install dependencies",
            instructions: [
                "npm install",
                "mkdir -p tmp",
                "date > tmp/last_install"
            ]
        },
        {
            id: "build",
            description: "build project",
            instructions: [
                "nx run-many -t build",
                "mkdir -p tmp",
                "date > tmp/last_build"
            ],
            files: ["tmp/last_install"]
        },
        {
            id: "serve",
            description: "run services in development mode",
            instructions: ["nx run-many -t serve"],
            files: [".ask/secrets.json", "tmp/last_install"]
        },
        {
            id: "format",
            description: "format project",
            instructions: ["nx format:write"]
        },
        {
            id: "lint",
            description: "lint project",
            instructions: ["nx run-many -t lint"]
        },
        {
            id: "test",
            description: "run tests",
            instructions: ["nx run-many -t test"],
            files: ["tmp/last_install"]
        },
        {
            id: "clean",
            description: "clean services cache",
            instructions: ["nx reset"]
        }
    ]
};
