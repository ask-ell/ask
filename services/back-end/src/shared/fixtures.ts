import type { IProjectConfigurationDTO, IAccountDTO, IAccountConfigurationDTO } from "@ask/back-end-api";


export type ProjectConfigurationFixture = Omit<IProjectConfigurationDTO, "version">;

export type Fixture = ProjectConfigurationFixture | IAccountDTO | IAccountConfigurationDTO;
