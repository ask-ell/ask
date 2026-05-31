import { IAggregate } from "../../types/aggregate.interface";
import { Id } from "../../types/id";
import { AccountConfigurationPermissionDTO } from "./account-configuration-permission.dto";


export interface IAccountConfigurationDTO extends IAggregate<'account-configuration'> {
    account: Id;
    projectConfiguration: Id;
    permissions: AccountConfigurationPermissionDTO[];
}
