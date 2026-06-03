import { Command } from "commander";
import { ILogger } from "@ask-ell/core";

import { RootOptions } from "../../../shared/options";


export type ActionCallbackParams = {
    options: RootOptions;
    args: string[];
};

export type ActionCallback = (params: ActionCallbackParams) => Promise<void>;

type ChildCommandProps = {
    id: string;
    logger: ILogger;
}

export class ChildCommand extends Command {
    protected logger: ILogger;

    constructor(
        {
            id,
            logger
        }: ChildCommandProps
    ) {
        super(id);
        this.logger = logger;
    }

    wrappedAction(callback: ActionCallback): this {
        async function wrappedCallback(command: Command): Promise<void> {
            const options: RootOptions = command.optsWithGlobals();
            const args: string[] = command.args;
            await callback({
                options,
                args
            });
        }

        return this.action(
            async function (): Promise<void> {
                await wrappedCallback(this)
                    .catch((error: any): void => {
                        this.logger.error(error.message ?? error);
                    });
            }
        );
    }
}
