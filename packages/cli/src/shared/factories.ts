import { ILogger } from "@ask-ell/core";

import { RootOptions } from "./options";
import { IGetProjectConfigurationUseCase, IGetProjectTasksUseCase } from "../application";
import { UserConfiguration } from "./user.configuration";


export type UserConfigurationFactory = ({
    options
}: {
    options: RootOptions
}) => UserConfiguration;

export type GetProjectTasksUseCaseFactory = (params: {
    options: RootOptions,
    logger: ILogger
}) => IGetProjectTasksUseCase;

export type GetProjectConfigurationUseCaseFactory = (params: {
    options: RootOptions,
    logger: ILogger
}) => IGetProjectConfigurationUseCase;
