import { AggregateRootState } from "@ask-ell/core/dist/src/ddd";

import { IVersionTagState } from "../domain/entities/version-tag/version-tag.state.interface";
import { IUserState } from "../domain/entities/user/user.state.interface";


export type VersionTagAggregateRootState = AggregateRootState<IVersionTagState>;
export type UserAggregateRootState = AggregateRootState<IUserState>;

export type LoginCredentials = {
    username: string;
    password: string;
};
