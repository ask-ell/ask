import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { Inject, Injectable } from "@nestjs/common";
import { ILogger } from "@ask-ell/core";
import { NestLogger } from "@ask-ell/nest";

import type { IProjectConfigurationDTO } from "@ask/back-end-api";

import type { IUnitOfWork } from "../../../../shared/unit-of-work"
import { UNIT_OF_WORK_PROVIDER } from "../../config/providers";
import { Fixture } from "../../../../shared/fixtures";


@Injectable()
export class FixtureService {
    private logger: ILogger = NestLogger.fromClass(FixtureService);

    constructor(
        @Inject(UNIT_OF_WORK_PROVIDER)
        private unitOfWork: IUnitOfWork
    ){
        this.setDataFromLocalFile().catch(this.logger.error.bind(this.logger));
    }

    async setDataFromLocalFile(): Promise<void> {
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
            fixtures.map((fixture: Fixture): Promise<void> => {
                if(fixture.type === "project-configuration") {
                    return this.persistProjectConfiguration(fixture);
                }
                return Promise.resolve()
            })
        )
    }

    private async persistProjectConfiguration(fixture: IProjectConfigurationDTO): Promise<void> {
        const isFixtureAlreadySaved: boolean = await this.unitOfWork.getProjectConfigurationRepository().updateOne(fixture);
        if(isFixtureAlreadySaved) {
            return this.logger.info(`Fixture "${fixture.id}" already saved and has been updated`);
        }
        await this.unitOfWork.getProjectConfigurationRepository().save(fixture);
        this.logger.info(`Fixture "${fixture.id}" saved`);
    }
}
