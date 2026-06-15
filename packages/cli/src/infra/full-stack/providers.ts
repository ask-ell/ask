import { ILogger, MaybeUndefined } from "@ask-ell/core";

import { GetProjectConfigurationUseCase, GetProjectTasksUseCase, IGetProjectConfigurationUseCase, IGetProjectTasksUseCase, IUnitOfWork } from "../../application";
import { RootOptions } from "../../shared/options";
import { UserConfiguration } from "../../shared/user.configuration";
import { FullStackUnitOfWork } from "./full-stack.unit-of-work";
import { GetProjectConfigurationUseCaseFactory, GetProjectTasksUseCaseFactory, UserConfigurationFactory } from "../../shared/factories";


let userConfiguration: MaybeUndefined<UserConfiguration>;
let unitOfWork: MaybeUndefined<FullStackUnitOfWork>;

export const userConfigurationFactory: UserConfigurationFactory = ({
    rootOptions
}: {
    rootOptions: RootOptions
}): UserConfiguration => {
    if(!userConfiguration) {
        userConfiguration = new UserConfiguration(rootOptions);
    }

    return userConfiguration;
}

const getUnitOfWork = ({
    logger,
    rootOptions
}: {
    logger: ILogger,
    rootOptions: RootOptions
}): FullStackUnitOfWork => {
    if(!unitOfWork) {
        const userConfiguration: UserConfiguration = userConfigurationFactory({
            rootOptions
        });
        unitOfWork = new FullStackUnitOfWork(
            logger,
            rootOptions,
            userConfiguration
        );
    }

    return unitOfWork;
};

export const getProjectTasksUseCaseFactory: GetProjectTasksUseCaseFactory = ({
    rootOptions,
    logger
}: {
    rootOptions: RootOptions,
    logger: ILogger
}): IGetProjectTasksUseCase => {
    const unitOfWork: IUnitOfWork = getUnitOfWork({
        logger,
        rootOptions
    });
    return new GetProjectTasksUseCase(unitOfWork);
};

export const getProjectConfigurationUseCaseFactory: GetProjectConfigurationUseCaseFactory = ({
    rootOptions,
    logger
}: {
    rootOptions: RootOptions,
    logger: ILogger
}): IGetProjectConfigurationUseCase => {
    const unitOfWork: IUnitOfWork = getUnitOfWork({
        logger,
        rootOptions
    });
    return new GetProjectConfigurationUseCase(unitOfWork);
};
