import type { IProjectConfigurationDTO, IUserDTO, IUserConfigurationDTO } from "@ask/back-end-api";


export type ProjectConfigurationFixture = Omit<IProjectConfigurationDTO, 'version' | 'creator'>;

export type Fixture = ProjectConfigurationFixture | IUserDTO | IUserConfigurationDTO;
