import { MaybeUndefined } from "@ask-ell/core";

import { FindOneProjectConfigurationUseCaseInput, IFindOneProjectConfigurationUseCase } from "../../ports/driving/use-cases/project-configuration/find.one.project-configuration.use-case.interface";
import { ProjectConfigurationAggregateRootState } from "../../ports/driving/use-cases/project-configuration/types";
import { IUnitOfWork } from "../../unit-of-work/unit-of-work.interface";


export class FindOneProjectConfigurationUseCase implements IFindOneProjectConfigurationUseCase {
    constructor(
        private unitOfWork: IUnitOfWork
    ) {}

    async run({
        identifier,
    }: FindOneProjectConfigurationUseCaseInput): Promise<MaybeUndefined<ProjectConfigurationAggregateRootState>> {
        // TODO: search by id and version
        const projectConfiguration = await this.unitOfWork.getProjectConfigurationProvider().findOneById(identifier);
        
        if(!projectConfiguration?.public){
            return undefined;
        }

        return projectConfiguration;
    }
}
