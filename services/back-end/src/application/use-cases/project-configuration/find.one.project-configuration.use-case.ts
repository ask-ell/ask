import { MaybeUndefined } from "@ask-ell/core";

import { FindOneProjectConfigurationUseCaseInput, IFindOneProjectConfigurationUseCase } from "../../ports/driving/use-cases/project-configuration/find.one.project-configuration.use-case.interface";
import { ProjectConfigurationAggregateRootState } from "../../ports/driving/use-cases/project-configuration/types";


export class FindOneProjectConfigurationUseCase implements IFindOneProjectConfigurationUseCase {
    run(input: FindOneProjectConfigurationUseCaseInput): Promise<MaybeUndefined<ProjectConfigurationAggregateRootState>> {
        throw new Error("TODO: implement");
    }
}
