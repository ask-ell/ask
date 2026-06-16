import { MaybeUndefined } from "@ask-ell/core";
import { IAggregateRootProvider } from "@ask-ell/core/dist/src/hexa";

import { IUserState } from '../../../domain/entities/user/user.state.interface'
import { LoginCredentials } from "../../types";


export interface IUserProvider extends IAggregateRootProvider<IUserState, IUserState> {
    findOneByLoginCredentials(dto: LoginCredentials): Promise<MaybeUndefined<IUserState>>;
}
