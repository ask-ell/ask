import { IPasswordManager } from "@ask-ell/core";

import { IProjectConfigurationProvider } from "../ports/driven/project-configuration/project-configuration.provider.interface";
import { IProjectConfigurationRepository } from "../ports/driven/project-configuration/project-configuration.repository.interface";
import { IVersionTagProvider } from "../ports/driven/version-tag/version-tag.provider.interface";
import { IVersionTagRepository } from "../ports/driven/version-tag/version-tag.repository.interface";
import { IUserProvider } from "../ports/driven/user/user.provider.interface";
import { IUserRepository } from "../ports/driven/user/user.repository.interface";


export interface IUnitOfWork {
    getProjectConfigurationProvider(): IProjectConfigurationProvider;
    getProjectConfigurationRepository(): IProjectConfigurationRepository;
    getVersionTagProvider(): IVersionTagProvider;
    getVersionTagRepository(): IVersionTagRepository;
    getUserProvider(): IUserProvider;
    getUserRepository(): IUserRepository;
    getPasswordManager(): IPasswordManager;
}
