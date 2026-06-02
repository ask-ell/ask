import { Provider } from "@nestjs/common";
import { KeyvStoreAdapterFactory } from "@ask-ell/back-end";

import { IUnitOfWork, FindOneProjectConfigurationUseCase, IFindOneProjectConfigurationUseCase, ISaveProjectConfigurationUseCase, SaveProjectConfigurationUseCase } from "../../application";
import { FIND_ONE_PROJECT_CONFIGURATION_USE_CASE, SAVE_PROJECT_CONFIGURATION_USE_CASE, UNIT_OF_WORK_PROVIDER } from "../nest";
import { FullStackUnitOfWork } from "./full-stack.unit-of-work";


export const providers: Provider[] = [
    KeyvStoreAdapterFactory,
    {
        provide: UNIT_OF_WORK_PROVIDER,
        inject: [KeyvStoreAdapterFactory],
        useFactory: (keyvStoreAdapterFactory: KeyvStoreAdapterFactory) => new FullStackUnitOfWork(keyvStoreAdapterFactory),
    },
    {
        provide: FIND_ONE_PROJECT_CONFIGURATION_USE_CASE,
        useFactory: (unitOfWork: IUnitOfWork): IFindOneProjectConfigurationUseCase => new FindOneProjectConfigurationUseCase(unitOfWork),
        inject: [UNIT_OF_WORK_PROVIDER]
    },
    {
        provide: SAVE_PROJECT_CONFIGURATION_USE_CASE,
        useFactory: (unitOfWork: IUnitOfWork): ISaveProjectConfigurationUseCase => new SaveProjectConfigurationUseCase(unitOfWork),
        inject: [UNIT_OF_WORK_PROVIDER]
    }
];