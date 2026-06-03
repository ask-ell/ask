import { ILogger } from '@ask-ell/core';
import { execSync } from 'node:child_process';

import { RunnableTask } from '../application';
import { RootOptions } from './options';

const runInstruction =
  ({ logger, options }: { logger: ILogger; options: RootOptions }) =>
  (instruction: string): void => {
    if (instruction.includes('@ask')) {
      let optionsFlagsStringified: string = '';

      Object.keys(options).forEach((optionKey: string): void => {
        optionsFlagsStringified += ` --${optionKey} ${options[optionKey as keyof RootOptions]}`;
      });

      instruction = instruction.replace(
        '@ask',
        process.argv[1] + optionsFlagsStringified,
      );
    }

    logger.info(`Running instruction: ${instruction}`);
    execSync(instruction, { stdio: 'inherit' });
    logger.info(`Task completed !`);
  };

export type TaskRunner = (task: RunnableTask) => void;

export const runTask =
  (params: { logger: ILogger; options: RootOptions }): TaskRunner =>
  (task: RunnableTask): void => {
    task.instructions.forEach(runInstruction(params));
  };
