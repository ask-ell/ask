import { KeyvAggregateRootRepository } from "@ask-ell/keyv";

import { UserAggregateRootState, IUserRepository } from "../../application";


export class KeyvUserRepository extends KeyvAggregateRootRepository<UserAggregateRootState, UserAggregateRootState> implements IUserRepository {
    protected purgeData({
        id,
        username,
        hashedPassword,
        admin
    }: UserAggregateRootState): UserAggregateRootState {
        return {
            id,
            username,
            hashedPassword,
            admin
        };
    }
}
