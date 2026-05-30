import { ILogger } from '@ask-ell/core';
import { IUnitOfWork, UnitOfWork } from '../../application';

import { HttpProjectConfigurationProvider, HttpProjectConfigurationRepository } from '../http';
import { RootOptions } from '../../shared/options';
import { UserConfiguration } from '../../shared/user.configuration';


export class FullStackUnitOfWork extends UnitOfWork implements IUnitOfWork {
    constructor(
        logger: ILogger,
        rootOptions: RootOptions,
        userConfiguration: UserConfiguration
    ) {
        super();
        this.projectConfigurationProvider = new HttpProjectConfigurationProvider(
            logger,
            rootOptions,
            userConfiguration
        );
        this.projectConfigurationRepository = new HttpProjectConfigurationRepository();
    }
}
