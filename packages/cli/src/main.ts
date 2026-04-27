#!/usr/bin/env node

import { Command } from "commander";
import { execSync } from "node:child_process";

import { fakeProject, nxProjectConfiguration } from "./data";
import { IProject, IProjectConfiguration, ITask } from "./types";


function runInstructions(instructions: string[]): void {
    instructions.forEach((instruction: string): void => {
        execSync(instruction, { stdio: 'inherit' });
    });
}

const setCommandAction = (task: ITask) => (): void => runInstructions(task.instructions);

async function main(): Promise<void> {
    const command: Command = new Command('ask');

    // TODO: fetch from server
    const project: IProject = await Promise.resolve(fakeProject);
    
    project.tasks.forEach((task: ITask) => {
        command
            .command(task.id)
            .description(task.description)
            .action(setCommandAction(task));
    });

    // TODO: fetch from server
    const projectConfiguration: IProjectConfiguration = await Promise.resolve(nxProjectConfiguration);

    projectConfiguration.tasks.forEach((task: ITask) => {
        command
            .command(task.id)
            .description(task.description)
            .action(setCommandAction(task));
    });

    command.parse();
}

main();