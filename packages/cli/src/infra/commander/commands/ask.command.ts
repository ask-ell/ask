import { Command } from "commander";

import { RootOptions } from "../types";


export class AskCommand extends Command {
    constructor() {
        super('ask');
        this
            .option('-s, --storage [PATH]', 'Storage directory path', '$HOME/.ask') // TODO: make creating it in home directory
            .option('-r, --remote [HOST]', 'Remote host')
            .option('-f, --fixtures [PATH]', 'Fixtures file path');
    }

    getRootOptions(): RootOptions {
        return this.opts();
    }
}
