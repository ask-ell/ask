import { MaybeUndefined } from "@ask-ell/core";

import {
    FindOneProjectConfigurationUseCase,
    IFindOneProjectConfigurationUseCase,
    IUnitOfWork,
    ProjectConfigurationAggregateRootState
} from "../application";
import { TestUnitOfWork } from "./test.unit-of-work";


describe(FindOneProjectConfigurationUseCase.name, (): void => {
    let unitOfWork: IUnitOfWork;
    let findOneProjectConfigurationUseCase: IFindOneProjectConfigurationUseCase;

    beforeEach((): void => {
        unitOfWork = new TestUnitOfWork();
        findOneProjectConfigurationUseCase = new FindOneProjectConfigurationUseCase(unitOfWork);
    });

    it('should not find a non-public project configuration by identifier', async (): Promise<void> => {
        await unitOfWork.getProjectConfigurationRepository().save({
            id: 'project-configuration:version',
            identifier: 'project-configuration',
            version: 'version'
        });

        await unitOfWork.getVersionTagRepository().save({
            identifier: 'project-configuration',
            tag: 'latest',
            version: 'version'
        });

        const result: MaybeUndefined<ProjectConfigurationAggregateRootState> = await findOneProjectConfigurationUseCase.run({
            identifier: 'project-configuration'
        });

        expect(result).toBeUndefined();
    });

    it('should not find a public project configuration by wrong identifier', async (): Promise<void> => {
        await unitOfWork.getProjectConfigurationRepository().save({
            id: 'project-configuration:version',
            identifier: 'project-configuration',
            version: 'version',
            public: true,
        });

        const result: MaybeUndefined<ProjectConfigurationAggregateRootState> = await findOneProjectConfigurationUseCase.run({
            identifier: 'wrong-identifier',
        });

        expect(result).toBeUndefined();
    });

    it('should find a public project configuration by identifier', async (): Promise<void> => {
        await unitOfWork.getProjectConfigurationRepository().save({
            id: 'project-configuration:version',
            identifier: 'project-configuration',
            version: 'version',
            public: true,
        });

        await unitOfWork.getVersionTagRepository().save({
            identifier: 'project-configuration',
            tag: 'latest',
            version: 'version'
        });

        const result: MaybeUndefined<ProjectConfigurationAggregateRootState> = await findOneProjectConfigurationUseCase.run({
            identifier: 'project-configuration'
        });

        expect(result?.identifier).toEqual('project-configuration');
    });

    it('should not find a public project configuration by identifier and wrong version', async (): Promise<void> => {
        await unitOfWork.getProjectConfigurationRepository().save({
            id: 'project-configuration:version',
            identifier: 'project-configuration',
            version: 'version',
            public: true,
        });

        await unitOfWork.getVersionTagRepository().save({
            identifier: 'project-configuration',
            tag: 'latest',
            version: 'version'
        });

        const result: MaybeUndefined<ProjectConfigurationAggregateRootState> = await findOneProjectConfigurationUseCase.run({
            identifier: 'project-configuration',
            version: 'wrong-version'
        });

        expect(result).toBeUndefined();
    });

    it('should find a public project configuration by identifier and specific version', async (): Promise<void> => {
        await unitOfWork.getProjectConfigurationRepository().save({
            id: 'project-configuration:version',
            identifier: 'project-configuration',
            version: 'version',
            public: true,
        });

        await unitOfWork.getVersionTagRepository().save({
            identifier: 'project-configuration',
            tag: 'latest',
            version: 'version'
        });

        const result: MaybeUndefined<ProjectConfigurationAggregateRootState> = await findOneProjectConfigurationUseCase.run({
            identifier: 'project-configuration',
            version: 'version'
        });

        expect(result?.identifier).toEqual('project-configuration');
    });

    it('should find a public project configuration by identifier and "latest" version', async (): Promise<void> => {
        await unitOfWork.getProjectConfigurationRepository().save({
            id: 'project-configuration:version',
            identifier: 'project-configuration',
            version: 'version',
            public: true,
        });

        await unitOfWork.getVersionTagRepository().save({
            identifier: 'project-configuration',
            tag: 'latest',
            version: 'version'
        });

        const result: MaybeUndefined<ProjectConfigurationAggregateRootState> = await findOneProjectConfigurationUseCase.run({
            identifier: 'project-configuration',
            version: 'latest'
        });

        expect(result?.identifier).toEqual('project-configuration');
    });
});
