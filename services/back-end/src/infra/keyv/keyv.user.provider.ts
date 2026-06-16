import { HashedPassword, IHashedPassword, IPasswordManager, MaybeUndefined } from "@ask-ell/core";
import { KeyvAggregateRootProvider } from "@ask-ell/keyv";
import Keyv from "keyv";

import { IUserProvider, UserAggregateRootState, IUserState, LoginCredentials } from "../../application";


export class KeyvUserProvider extends KeyvAggregateRootProvider<UserAggregateRootState, UserAggregateRootState> implements IUserProvider {
    constructor(
        instance: Keyv<UserAggregateRootState>,
        private passwordManager: IPasswordManager
    ) {
        super(instance);
    }

    async findOneByLoginCredentials({
        username,
        password
    }: LoginCredentials): Promise<MaybeUndefined<IUserState>> {
        for await (const user of this.getAllDataGenerator()) {
            if(user.username === username) {
                const hashedPassword: IHashedPassword = new HashedPassword(user.hashedPassword);

                if(await this.passwordManager.matchs(password, hashedPassword)) {
                    return user;
                }

                return undefined;
            }
        }

        return undefined;
    }
}
