import { Command } from "commander";

import { RootOptions } from "../../../shared/root-options";


export class AskCommand extends Command {
    constructor() {
        super('ask');
        this
            .option('-s, --storage [PATH]', 'Storage directory path', '$HOME/.ask') // TODO: make creating it in home directory
            .option('-r, --remote [URL]', 'Remote URL')
            .option('-l, --log [LEVEL]', 'Logger level')
            .allowExcessArguments();
    }

    getRootOptions(): RootOptions {
        return this.opts();
    }
}
