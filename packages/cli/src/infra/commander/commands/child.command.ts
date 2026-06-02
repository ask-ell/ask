import { Command } from "commander";

import { RootOptions } from "../../../shared/options";


export type ActionCallbackParams = {
    options: RootOptions;
    args: string[];
};

export type ActionCallback = (params: ActionCallbackParams) => Promise<void>;

export class ChildCommand extends Command {
    override action(callback: ActionCallback): this {
        return super.action(async function (): Promise<void> {
            const options: RootOptions = this.optsWithGlobals();
            const args: string[] = this.args;
            await callback({
                options,
                args
            });
        });
    }
}
