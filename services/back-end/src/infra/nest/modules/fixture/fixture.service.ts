import { readFile } from "node:fs/promises";
import { Inject, Injectable } from "@nestjs/common";
import { ILogger } from "@ask-ell/core";
import { NestLogger } from "@ask-ell/nest";

import type { ISaveProjectConfigurationUseCase } from "../../../../application";
import { SAVE_PROJECT_CONFIGURATION_USE_CASE } from "../../config/providers";
import { Fixture, ProjectConfigurationFixture } from "../../../../shared/fixtures";
import { FIXTURES_FILE_PATH } from "../../../../shared/paths";
import { isDevMode } from "../../../../shared/environment";
import { nxProjectConfiguration } from "./data/project-configuration/nx";


@Injectable()
export class FixtureService {
    private logger: ILogger = NestLogger.fromClass(FixtureService);

    constructor(
        @Inject(SAVE_PROJECT_CONFIGURATION_USE_CASE)
        private saveProjectConfigurationUseCase: ISaveProjectConfigurationUseCase
    ){
        if(isDevMode) {
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

        if(!fixtures.length) {
            this.logger.info("No fixtures to load from local file");
        }

        await Promise.all(
            fixtures.map(async (fixture: Fixture): Promise<void> => {
                switch(fixture.type) {
                    case "project-configuration":
                        return this.saveLocalProjectConfiguration(fixture);
                    default:
                        return Promise.resolve();
                }
            })
        );

        await this.saveLocalProjectConfiguration(nxProjectConfiguration);
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
            });
    }
}
