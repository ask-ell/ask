import { existsSync } from "node:fs";
import { MaybeUndefined } from "@ask-ell/core";

import { USER_CONFIGURATION_PATH } from './path';
import { RootOptions } from "./options";


type RemoteConfiguration = {
    url: string;
}

type UserConfigurationState = {
    remotes: RemoteConfiguration[];
    defaultRemote: string;
}

export class UserConfiguration {
    private instance: MaybeUndefined<UserConfigurationState>;

    constructor(
        private rootOptions: RootOptions
    ) {}

    getInstance(): UserConfigurationState {
        if(!this.instance) {
            if(!existsSync(USER_CONFIGURATION_PATH(this.rootOptions.storage))) {
                throw new Error('No user configured. Run "ask login" before');
            }
        }

        throw new Error('Method not implemented.');
    }
}
