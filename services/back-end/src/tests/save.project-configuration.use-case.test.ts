import { MaybeUndefined, TestMustFailError } from "@ask-ell/core";

import {
    DuplicatedProjectConfigurationError,
    ISaveProjectConfigurationUseCase,
    IUnitOfWork,
    ProjectConfigurationAggregateRootState,
    SaveProjectConfigurationUseCase,
    SaveProjectConfigurationUseCaseInput,
    UnauthorizedError
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
            creatorUsername: 'test',
            creatorToken: 'test',
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
            creatorUsername: 'test',
            creatorToken: 'test',
            public: true
        };

        const result: ProjectConfigurationAggregateRootState = await saveProjectConfigurationUseCase.run(saveConfigurationDTO);
        const savedConfiguration: MaybeUndefined<ProjectConfigurationAggregateRootState> = await unitOfWork.getProjectConfigurationProvider().findOneById(result.id!);
        expect(savedConfiguration).toBeDefined();
    });

    it('should not save a project configuration with wrong creator credentials', async (): Promise<void> => {
        let saveConfigurationDTO: SaveProjectConfigurationUseCaseInput = {
            identifier: 'project-configuration',
            description: 'Project configuration description',
            creatorUsername: 'wrong',
            creatorToken: 'test',
            public: true
        };

        try {
            await saveProjectConfigurationUseCase.run(saveConfigurationDTO);
            throw new TestMustFailError();
        } catch(error: any) {
            expect(error).toBeInstanceOf(UnauthorizedError);
        }

        saveConfigurationDTO = {
            ...saveConfigurationDTO,
            creatorUsername: 'test',
            creatorToken: 'wrong'
        };

        try {
            await saveProjectConfigurationUseCase.run(saveConfigurationDTO);
            throw new TestMustFailError();
        } catch(error: any) {
            expect(error).toBeInstanceOf(UnauthorizedError);
        }
    });
});
