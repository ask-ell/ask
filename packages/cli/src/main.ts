#!/usr/bin/env node

import { AskCommand } from "./ask.command";


async function main(): Promise<void> {
    const askCommand: AskCommand = new AskCommand();
    await askCommand.run();
}

main();