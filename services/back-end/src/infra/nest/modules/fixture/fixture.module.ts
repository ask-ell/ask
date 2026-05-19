import { Module } from "@nestjs/common"

import { FixtureService } from "./fixture.service";


@Module({
    providers: [FixtureService]
})
export class FixtureModule {}
