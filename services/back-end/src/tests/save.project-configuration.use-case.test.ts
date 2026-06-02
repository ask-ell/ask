import { MaybeUndefined, TestMustFailError } from "@ask-ell/core";

import {
    DuplicatedProjectConfigurationError,
    ISaveProjectConfigurationUseCase,
    IUnitOfWork,
    ProjectConfigurationAggregateRootState,
    SaveProjectConfigurationUseCase,
    SaveProjectConfigurationUseCaseInput
} from "../application";
import { TestUnitOfWork } from "./test.unit-of-work";


describe(SaveProjectConfigurationUseCase.name, (): void => {
    let unitOfWork: IUnitOfWork;
    let saveProjectConfigurationUseCase: ISaveProjectConfigurationUseCase;

    beforeEach((): void => {
        unitOfWork = new TestUnitOfWork();
        saveProjectConfigurationUseCase = new SaveProjectConfigurationUseCase(unitOfWork);
    });

    it('should not save a project configuration with existing data', async (): Promise<void> => {
        const savedConfigurationDTO: SaveProjectConfigurationUseCaseInput = {
            identifier: 'project-configuration',
            description: 'Project configuration description',
            public: true
        };

        await unitOfWork.getProjectConfigurationRepository().save({
            ...savedConfigurationDTO,
            id: 'project-configuration-id',
            version: 'version'
        });

        try {
            await saveProjectConfigurationUseCase.run(savedConfigurationDTO);
            throw new TestMustFailError();
        } catch(error: any) {
            expect(error).toBeInstanceOf(DuplicatedProjectConfigurationError);
        }
    });

    it('should save a project configuration', async (): Promise<void> => {
        const saveConfigurationDTO: SaveProjectConfigurationUseCaseInput = {
            identifier: 'project-configuration',
            description: 'Project configuration description',
            public: true
        };

        const result: ProjectConfigurationAggregateRootState = await saveProjectConfigurationUseCase.run(saveConfigurationDTO);
        const savedConfiguration: MaybeUndefined<ProjectConfigurationAggregateRootState> = await unitOfWork.getProjectConfigurationProvider().findOneById(result.id!);
        expect(savedConfiguration).toBeDefined();
    });
});
