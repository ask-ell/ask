import { IAggregateRootRepository } from "@ask-ell/core/dist/src/hexa";

import { IUserState } from '../../../domain/entities/user/user.state.interface';


export interface IUserRepository extends IAggregateRootRepository<IUserState, IUserState> {}
