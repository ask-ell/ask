import { ILogger } from '@ask-ell/core';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

import { IFileDTO } from '@ask/back-end-api';

import { RunnableTask } from '../application';
import { RootOptions } from './options';


const translateAskKeywordInInstruction =
  ({ rootOptions }: { rootOptions: RootOptions }) =>
  (instruction: string): string => {
    let optionsFlagsStringified: string = '';

    Object.keys(rootOptions).forEach((optionKey: string): void => {
      optionsFlagsStringified += ` --${optionKey} ${rootOptions[optionKey as keyof RootOptions]}`;
    });

    return instruction.replace(
      '@ask',
      process.argv[1] + optionsFlagsStringified,
    );
};

const translateInstruction =
  ({ rootOptions }: { rootOptions: RootOptions }) =>
  (instruction: string): string => {
    if (instruction.includes('@ask')) {
      return translateAskKeywordInInstruction({ rootOptions })(instruction);
    }
    return instruction;
};

const runInstruction =
  ({ logger, rootOptions }: { logger: ILogger; rootOptions: RootOptions }) =>
  (instruction: string): void => {
    const translatedInstruction: string = translateInstruction({ rootOptions })(instruction);
    logger.info(`Running instruction: ${translatedInstruction}`);
    execSync(translatedInstruction, { stdio: 'inherit' });
    logger.info(`Task completed !`);
  };

export type TaskRunner = (task: RunnableTask) => void;

export const runTask =
  (params: { logger: ILogger; rootOptions: RootOptions }): TaskRunner =>
  (task: RunnableTask): void => {
    task.files?.forEach((filePath: string): void => {
      task.origin?.files?.forEach((file: IFileDTO): void => {
        if (file.path === filePath && !existsSync(filePath)) {
          file.instructions.forEach(runInstruction(params));
        }
      });
    });
    task.instructions.forEach(runInstruction(params));
  };
