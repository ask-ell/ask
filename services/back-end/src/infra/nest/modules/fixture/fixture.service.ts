import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { Inject, Injectable } from "@nestjs/common";
import { ILogger } from "@ask-ell/core";
import { NestLogger } from "@ask-ell/nest";

import type { IProjectConfigurationDTO } from "@ask/back-end-api";

import type { IUnitOfWork } from "../../../../application";
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
            fixtures.map(async (fixture: Fixture): Promise<void> => {
                await Promise.resolve();
                if(fixture.type === "project-configuration") {
                    return this.persistProjectConfiguration(fixture);
                }
            })
        )
    }

    private async persistProjectConfiguration(fixture: IProjectConfigurationDTO): Promise<void> {
        const isProjectConfigurationAlreadyExists: boolean = await this.unitOfWork.getProjectConfigurationRepository().updateOne(fixture);
        if(isProjectConfigurationAlreadyExists) {
            return this.logger.info(`Project configuration "${fixture.id}" already saved and updated`);
        }
        await this.unitOfWork.getProjectConfigurationRepository().save(fixture);
        return this.logger.info(`Project configuration "${fixture.id}" saved`);
    }
}
