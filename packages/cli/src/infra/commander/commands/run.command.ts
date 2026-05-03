import { Command } from "commander";


export class RunCommand extends Command {
    constructor() {
        super('run');
        this.description('run a project task'); //.allowUnknownOption(true); TODO: uncomment ?
    }
}
