import { MaybeUndefined } from "@ask-ell/core";
import { Id } from "@ask-ell/core/dist/src/ddd";

import { FindOneProjectConfigurationUseCaseInput, IFindOneProjectConfigurationUseCase } from "../../ports/driving/use-cases/project-configuration/find.one.project-configuration.use-case.interface";
import { ProjectConfigurationAggregateRootState } from "../../ports/driving/use-cases/project-configuration/types";
import { IUnitOfWork } from "../../unit-of-work/unit-of-work.interface";
import { VersionTagAggregateRootState } from "../../ports/types";


export class FindOneProjectConfigurationUseCase implements IFindOneProjectConfigurationUseCase {
    constructor(
        private unitOfWork: IUnitOfWork
    ) {}

    async run({
        identifier,
        version: definedVersion
    }: FindOneProjectConfigurationUseCaseInput): Promise<MaybeUndefined<ProjectConfigurationAggregateRootState>> {
        let version: string = definedVersion ?? 'latest';
        if(version === 'latest') {
            const versionTag: MaybeUndefined<VersionTagAggregateRootState> = await this.unitOfWork.getVersionTagProvider().findOneByTagAndIdentifier({
                identifier,
                tag: 'latest'
            });

            if(!versionTag) {
                return undefined;
            }
            version = versionTag.version;
        }

        const projectConfigurationId: Id = `${identifier}:${version}`;
        const projectConfiguration: MaybeUndefined<ProjectConfigurationAggregateRootState> = await this.unitOfWork.getProjectConfigurationProvider().findOneById(projectConfigurationId);
        
        if(!projectConfiguration?.public){
            return undefined;
        }

        return projectConfiguration;
    }
}
