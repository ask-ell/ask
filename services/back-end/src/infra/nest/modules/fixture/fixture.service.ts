import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { Inject, Injectable } from "@nestjs/common";
import { ILogger } from "@ask-ell/core";
import { NestLogger } from "@ask-ell/nest";

import type { IProjectConfigurationDTO } from "@ask/back-end-api";

import type { ISaveProjectConfigurationUseCase } from "../../../../application";
import { SAVE_PROJECT_CONFIGURATION_USE_CASE } from "../../config/providers";
import { Fixture } from "../../../../shared/fixtures";


@Injectable()
export class FixtureService {
    private logger: ILogger = NestLogger.fromClass(FixtureService);

    constructor(
        @Inject(SAVE_PROJECT_CONFIGURATION_USE_CASE)
        private saveProjectConfigurationUseCase: ISaveProjectConfigurationUseCase
    ){
        this.saveDataFromLocalFile().catch(this.logger.error.bind(this.logger));
    }

    async saveDataFromLocalFile(): Promise<void> {
        // TODO: not run in production mode

        const fixtures: Fixture[] = JSON.parse(
            await readFile(
                join(process.cwd(), 'fixtures.json'),
                'utf-8'
            )
        );

        if(!fixtures.length) {
            this.logger.info("No fixtures to load from local file");
        }

        await Promise.all(
            fixtures.map(async (fixture: Fixture): Promise<void> => {
                await Promise.resolve();
                if(fixture.type === "project-configuration") {
                    return this.saveProjectConfiguration(fixture);
                }
            })
        );
    }

    private async saveProjectConfiguration(fixture: IProjectConfigurationDTO): Promise<void> {
        await this.saveProjectConfigurationUseCase.run({
            ...fixture,
            identifier: fixture.id
        });
        return this.logger.info(`Project configuration "${fixture.id}" saved / updated`);
    }
}
