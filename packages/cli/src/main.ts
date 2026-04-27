#!/usr/bin/env node

import { Command } from "commander";
import { execSync } from "node:child_process";
import { ILogger } from "@ask-ell/core";

import { askProject, nxProjectConfiguration } from "./data";
import { Id, IProject, IProjectConfiguration, ITask } from "./types";


const logger: ILogger = console;

function runInstructions(instructions: string[]): void {
    instructions.forEach((instruction: string): void => {
        logger.info(`Running instruction: ${instruction}`);
        execSync(instruction, { stdio: 'inherit' });
        logger.info(`Task completed !`);
    });
}

const setCommandAction = (task: ITask) => (): void => runInstructions(task.instructions);

async function main(): Promise<void> {
    const command: Command = new Command('ask');

    const tasks: Map<Id, ITask> = new Map();

    // TODO: fetch from server
    const project: IProject = await Promise.resolve(askProject);
    const projectConfiguration: IProjectConfiguration = await Promise.resolve(nxProjectConfiguration);

    project.tasks?.forEach((task: ITask): void => {
        task.description = `${task.description} <- *`;
        tasks.set(task.id, task);
    });

    projectConfiguration.tasks?.forEach((task: ITask): void => {
        task.description = `${task.description} <- ${projectConfiguration.id}`;
        tasks.set(task.id, task);
    });

    tasks.forEach((task: ITask): void => {
        command
            .command(task.id)
            .description(task.description)
            .action(setCommandAction(task));
    });

    command.parse();
}

main();