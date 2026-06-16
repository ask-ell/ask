import { MaybeUndefined } from "@ask-ell/core";
import { existsSync, readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";

import { USER_CONFIGURATION_PATH } from './path';
import { RootOptions } from "./options";


type RemoteConfiguration = {
    url: string;
}

export type UserConfigurationState = {
    remotes: RemoteConfiguration[];
    defaultRemote: string;
}

export class UserConfiguration {
    private instance: MaybeUndefined<UserConfigurationState>;

    constructor(
        private rootOptions: RootOptions
    ) {
        const userConfigurationPath: string = USER_CONFIGURATION_PATH(this.rootOptions.storage);
        if(existsSync(userConfigurationPath)) {
            this.instance = JSON.parse(readFileSync(userConfigurationPath, 'utf-8'));
        }
    }

    getInstance(): UserConfigurationState {
        if(!this.instance) {
            throw new Error('No user configured. Run "ask login" before');
        }
        return this.instance;
    }

    async addRemoteUrl(remoteUrl: string): Promise<void> {
        if(this.instance) {
            this.instance.defaultRemote = remoteUrl;
            const remoteAlreadySaved: boolean = this.instance.remotes.some(remote => remote.url === remoteUrl);
            if(!remoteAlreadySaved) {
                this.instance.remotes.push({
                    url: remoteUrl
                });
            }
        } else {
            this.instance = {
                defaultRemote: remoteUrl,
                remotes: [
                    {
                        url: remoteUrl
                    }
                ]
            };
        }

        await writeFile(
            USER_CONFIGURATION_PATH(this.rootOptions.storage),
            JSON.stringify(this.instance, null, 2),
            'utf-8'
        );
    }
}
