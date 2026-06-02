import { ILogger, MaybeUndefined } from "@ask-ell/core";

import { GetProjectConfigurationUseCase, GetProjectTasksUseCase, IGetProjectConfigurationUseCase, IGetProjectTasksUseCase, IUnitOfWork } from "../../application";
import { RootOptions } from "../../shared/options";
import { UserConfiguration } from "../../shared/user.configuration";
import { FullStackUnitOfWork } from "./full-stack.unit-of-work";
import { GetProjectConfigurationUseCaseFactory, GetProjectTasksUseCaseFactory, UserConfigurationFactory } from "../../shared/factories";


let userConfiguration: MaybeUndefined<UserConfiguration>;
let unitOfWork: MaybeUndefined<FullStackUnitOfWork>;

export const userConfigurationFactory: UserConfigurationFactory = ({
    options
}: {
    options: RootOptions
}): UserConfiguration => {
    if(!userConfiguration) {
        userConfiguration = new UserConfiguration(options);
    }

    return userConfiguration;
}

const getUnitOfWork = ({
    logger,
    options
}: {
    logger: ILogger,
    options: RootOptions
}): FullStackUnitOfWork => {
    if(!unitOfWork) {
        const userConfiguration: UserConfiguration = userConfigurationFactory({
            options
        });
        unitOfWork = new FullStackUnitOfWork(
            logger,
            options,
            userConfiguration
        );
    }

    return unitOfWork;
};

export const getProjectTasksUseCaseFactory: GetProjectTasksUseCaseFactory = ({
    options,
    logger
}: {
    options: RootOptions,
    logger: ILogger
}): IGetProjectTasksUseCase => {
    const unitOfWork: IUnitOfWork = getUnitOfWork({
        logger,
        options
    });
    return new GetProjectTasksUseCase(unitOfWork);
};

export const getProjectConfigurationUseCaseFactory: GetProjectConfigurationUseCaseFactory = ({
    options,
    logger
}: {
    options: RootOptions,
    logger: ILogger
}): IGetProjectConfigurationUseCase => {
    const unitOfWork: IUnitOfWork = getUnitOfWork({
        logger,
        options
    });
    return new GetProjectConfigurationUseCase(unitOfWork);
};
