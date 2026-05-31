import { IAggregate } from "../../types/aggregate.interface";


export interface IAccountDTO extends IAggregate<'account'> {
    username: string;
    token: string;
}
