import { Command } from "commander";

import { RootOptions } from "../types";


export class AskCommand extends Command {
    constructor() {
        super('ask');
        this.option('-s, --storage [PATH]', 'Path to the storage directory', '$HOME/.ask'); // TODO: make creating it in home directory
    }

    getRootOptions(): RootOptions {
        return this.opts();
    }
}
