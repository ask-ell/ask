import { IAggregate } from "../../types/aggregate.interface";
import { Id } from "../../types/id";
import { UserConfigurationPermissionDTO } from "./user-configuration-permission.dto";


export interface IUserConfigurationDTO extends IAggregate<'user-configuration'> {
    projectConfiguration: Id;
    user: Id;
    permissions: UserConfigurationPermissionDTO[];
}
