import { AskCommand } from '../commander';

export const run = (): Promise<void> => new AskCommand().run();