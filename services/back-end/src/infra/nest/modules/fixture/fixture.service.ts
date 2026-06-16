import { readFile } from "node:fs/promises";
import { Inject, Injectable } from "@nestjs/common";
import { IHashedPassword, ILogger, MaybeUndefined } from "@ask-ell/core";
import { NestLogger } from "@ask-ell/nest";

import { IUserDTO } from "@ask/back-end-api";

import type { ISaveProjectConfigurationUseCase, IUnitOfWork, IUserState } from "../../../../application";
import { SAVE_PROJECT_CONFIGURATION_USE_CASE, UNIT_OF_WORK_PROVIDER } from "../../config/providers";
import { Fixture, ProjectConfigurationFixture } from "../../../../shared/fixtures";
import { FIXTURES_FILE_PATH } from "../../../../shared/paths";
import { isDevMode } from "../../../../shared/environment";
import { nxProjectConfiguration } from './data/project-configuration/nx';
import { sortFixtures } from "./utils";


@Injectable()
export class FixtureService {
    private logger: ILogger = NestLogger.fromClass(FixtureService);

    constructor(
        @Inject(SAVE_PROJECT_CONFIGURATION_USE_CASE)
        private saveProjectConfigurationUseCase: ISaveProjectConfigurationUseCase,
        @Inject(UNIT_OF_WORK_PROVIDER)
        private unitOfWork: IUnitOfWork
    ) {
        if (isDevMode) {
            this.saveDevData().catch(this.logger.error.bind(this.logger));
        }
    }

    async saveDevData(): Promise<void> {
        const fixtures: Fixture[] = JSON.parse(
            await readFile(
                FIXTURES_FILE_PATH,
                'utf-8'
            )
        );

        if (!fixtures.length) {
            this.logger.info("No fixtures to load from local file");
        }

        await Promise.all(
            fixtures
                .sort(sortFixtures)
                .map(async (fixture: Fixture): Promise<void> => {
                    switch (fixture.type) {
                        case "user":
                            return this.saveLocalUser(fixture);
                        case "project-configuration":
                            return this.saveLocalProjectConfiguration(fixture);
                        default:
                            return Promise.resolve();
                    }
                })
        );

        await this.saveLocalProjectConfiguration(nxProjectConfiguration);
    }

    private async saveLocalUser(fixture: IUserDTO): Promise<void> {
        const existingUser: MaybeUndefined<IUserState> = await this.unitOfWork
            .getUserProvider()
            .findOneByLoginCredentials(fixture);
        if (existingUser) {
            return this.logger.info(`User "${existingUser.username}" already exists`);
        }

        const hashedPassword: IHashedPassword = await this.unitOfWork.getPasswordManager().generateFromPlainText(fixture.password);

        return this.unitOfWork
            .getUserRepository()
            .save({
                ...fixture,
                hashedPassword: hashedPassword.toString()
            })
            .then((): void => {
                this.logger.info(`User "${fixture.username}" saved`);
            })
            .catch((error: Error): void => this.logger.warn(error.message));
    }

    private async saveLocalProjectConfiguration(fixture: ProjectConfigurationFixture): Promise<void> {
        return this.saveProjectConfigurationUseCase
            .run({
                ...fixture,
                creator: {
                    username: 'test',
                    password: 'test'
                },
                identifier: fixture.id
            })
            .then((): void => {
                this.logger.info(`Project configuration "${fixture.id}" saved/ updated`);
            })
            .catch((error: Error): void => this.logger.warn(error.message));
    }
}
