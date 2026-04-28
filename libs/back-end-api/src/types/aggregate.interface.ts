import { Id } from "../types/id";


export interface IAggregate<Type> {
    id: Id;
    type: Type;
}
