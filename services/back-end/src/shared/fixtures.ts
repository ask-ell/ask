import type { IProjectConfigurationDTO, IAccountDTO, IAccountConfigurationDTO } from "@ask/back-end-api";


export type ProjectConfigurationFixture = Omit<IProjectConfigurationDTO, 'version' | 'creator'>;

export type Fixture = ProjectConfigurationFixture | IAccountDTO | IAccountConfigurationDTO;
