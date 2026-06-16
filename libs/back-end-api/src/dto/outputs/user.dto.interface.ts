import { IAggregate } from "../../types/aggregate.interface";


export interface IUserDTO extends IAggregate<'user'> {
    username: string;
    password: string;
}
