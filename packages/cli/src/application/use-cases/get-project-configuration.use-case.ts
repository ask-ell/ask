import { MaybeUndefined } from "@ask-ell/core";

import { IProjectConfigurationPartialState } from "../domain/entities/project/project-configuration.partial.state";
import { IGetProjectConfigurationUseCase } from "../ports/driving/use-cases/project-configuration/get-project-configuration.use-case.interface";
import { IUnitOfWork } from "../unit-of-work/unit-of-work.interface";
import { IProjectConfigurationState } from "../domain/entities/project-configuration/project-configuration.state.interface";


export class GetProjectConfigurationUseCase implements IGetProjectConfigurationUseCase {
    constructor(
        private unitOfWork: IUnitOfWork
    ){}

    async run(projectConfigurationPartialState: IProjectConfigurationPartialState): Promise<MaybeUndefined<IProjectConfigurationState>> {
        return this.unitOfWork
            .getProjectConfigurationProvider()
            .findOneFromPartialState(projectConfigurationPartialState);
    }
}
