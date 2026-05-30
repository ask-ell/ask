import type { Id, IProjectConfigurationDTO } from "@ask/back-end-api";


type AccountFixture = {
    id: Id;
    type: 'account';
    username: string;
    token: string;
}; // TODO: move in lib

enum AccountConfigurationPermission {
    GET = "get",
    PUT = "put",
    DELETE = "delete",
};

type IAccountConfigurationDTO = {
    id: Id;
    permissions: AccountConfigurationPermission[];
}; // TODO: move in lib

export type ProjectConfigurationFixture = Omit<IProjectConfigurationDTO, "version"> & {
    accounts?: IAccountConfigurationDTO[];
}

export type Fixture = ProjectConfigurationFixture | AccountFixture;
