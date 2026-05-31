import { Command } from "commander";

import { RootOptions } from "../../../shared/options";


export type ActionCallbackParams<Args = unknown> = {
    options: RootOptions;
    args: Args;
};

export type ActionCallback<Args = unknown> = (params: ActionCallbackParams<Args>) => Promise<void>;

export class ChildCommand extends Command {
    override action<Args>(callback: ActionCallback<Args>): this {
        return super.action(async (args: Args, command: any): Promise<void> => {
            const options: RootOptions = command.optsWithGlobals();
            await callback({
                options,
                args
            });
        });
    }
}
