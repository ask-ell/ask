import { AskCommand } from './ask.command';

export const run = (): Promise<void> => new AskCommand().run();