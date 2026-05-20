import { Provider } from "@nestjs/common";

import { IUnitOfWork, FindOneProjectConfigurationUseCase, IFindOneProjectConfigurationUseCase } from "../../application";
import { FIND_ONE_PROJECT_CONFIGURATION_USE_CASE, UNIT_OF_WORK_PROVIDER } from "../nest";
import { FullStackUnitOfWork } from "./full-stack.unit-of-work";


export const providers: Provider[] = [
    {
        provide: UNIT_OF_WORK_PROVIDER,
        useClass: FullStackUnitOfWork
    },
    {
        provide: FIND_ONE_PROJECT_CONFIGURATION_USE_CASE,
        useFactory: (unitOfWork: IUnitOfWork): IFindOneProjectConfigurationUseCase => new FindOneProjectConfigurationUseCase(unitOfWork),
        inject: [UNIT_OF_WORK_PROVIDER]
    }
];