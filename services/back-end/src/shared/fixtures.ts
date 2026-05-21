import type { IProjectConfigurationDTO } from "@ask/back-end-api";


type AccountFixture = {
    id: string;
    type: 'account';
    username: string;
    token: string;
}; // TODO: move in application

type AccountConfiguration = {
    id: string;
    permissions: string[];
}; // TODO: move in application

export type ProjectConfigurationFixture = Omit<IProjectConfigurationDTO, "version"> & {
    accounts?: AccountConfiguration[];
}

export type Fixture = ProjectConfigurationFixture | AccountFixture;
