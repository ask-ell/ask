import { IAggregate } from "./aggregate.interface";
import { Id } from "./id";


export type PartialAggregate<Aggregate extends IAggregate<unknown>> = Partial<Aggregate> & {
    id: Id;
}
