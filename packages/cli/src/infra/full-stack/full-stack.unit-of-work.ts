import { ILogger } from '@ask-ell/core';
import { IUnitOfWork, UnitOfWork } from '../../application';

import { HttpProjectConfigurationProvider, HttpProjectConfigurationRepository } from '../http';
import { RootOptions } from '../../shared/options';


export class FullStackUnitOfWork extends UnitOfWork implements IUnitOfWork {
    constructor(
        logger: ILogger,
        rootOptions: RootOptions
    ) {
        super();
        this.projectConfigurationProvider = new HttpProjectConfigurationProvider(
            logger,
            rootOptions
        );
        this.projectConfigurationRepository = new HttpProjectConfigurationRepository();
    }
}
