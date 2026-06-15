import { ILogger } from "@ask-ell/core";

import { RootOptions } from "./options";
import { IGetProjectConfigurationUseCase, IGetProjectTasksUseCase } from "../application";
import { UserConfiguration } from "./user.configuration";


export type UserConfigurationFactory = ({
    rootOptions
}: {
    rootOptions: RootOptions
}) => UserConfiguration;

export type GetProjectTasksUseCaseFactory = (params: {
    rootOptions: RootOptions,
    logger: ILogger
}) => IGetProjectTasksUseCase;

export type GetProjectConfigurationUseCaseFactory = (params: {
    rootOptions: RootOptions,
    logger: ILogger
}) => IGetProjectConfigurationUseCase;
