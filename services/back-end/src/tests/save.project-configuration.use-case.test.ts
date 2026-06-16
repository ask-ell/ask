import { IHashedPassword, MaybeUndefined, TestMustFailError } from "@ask-ell/core";

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

    it('should not save a project configuration with wrong creator username', async (): Promise<void> => {
        const hashedPassword: IHashedPassword = await unitOfWork
            .getPasswordManager()
            .generateFromPlainText('test');

        await unitOfWork.getUserRepository().save({
            username: 'test',
            hashedPassword: hashedPassword.toString(),
            admin: true
        });

        let saveConfigurationDTO: SaveProjectConfigurationUseCaseInput = {
            identifier: 'project-configuration',
            creator: {
                username: 'wrong',
                password: 'test'
            }
        };

        try {
            await saveProjectConfigurationUseCase.run(saveConfigurationDTO);
            throw new TestMustFailError();
        } catch(error: any) {
            expect(error).toBeInstanceOf(UnauthorizedError);
        }
    });

    it('should not save a project configuration with wrong creator password', async (): Promise<void> => {
        const hashedPassword: IHashedPassword = await unitOfWork
            .getPasswordManager()
            .generateFromPlainText('test');

        await unitOfWork.getUserRepository().save({
            username: 'test',
            hashedPassword: hashedPassword.toString(),
            admin: true
        });

        const saveConfigurationDTO: SaveProjectConfigurationUseCaseInput = {
            identifier: 'project-configuration',
            creator: {
                username: 'test',
                password: 'wrong'
            }
        };

        try {
            await saveProjectConfigurationUseCase.run(saveConfigurationDTO);
            throw new TestMustFailError();
        } catch(error: any) {
            expect(error).toBeInstanceOf(UnauthorizedError);
        }
    });

    it('should not save a project configuration with non-administrator creator', async (): Promise<void> => {
        const hashedPassword: IHashedPassword = await unitOfWork
            .getPasswordManager()
            .generateFromPlainText('test');

        await unitOfWork.getUserRepository().save({
            username: 'test',
            hashedPassword: hashedPassword.toString(),
            admin: false
        });

        const saveConfigurationDTO: SaveProjectConfigurationUseCaseInput = {
            identifier: 'project-configuration',
            creator: {
                username: 'test',
                password: 'test'
            }
        };

        try {
            await saveProjectConfigurationUseCase.run(saveConfigurationDTO);
            throw new TestMustFailError();
        } catch(error: any) {
            expect(error).toBeInstanceOf(UnauthorizedError);
        }
    });

    it('should save a project configuration', async (): Promise<void> => {
        const hashedPassword: IHashedPassword = await unitOfWork
            .getPasswordManager()
            .generateFromPlainText('test');

        await unitOfWork.getUserRepository().save({
            username: 'test',
            hashedPassword: hashedPassword.toString(),
            admin: true
        });

        const saveConfigurationDTO: SaveProjectConfigurationUseCaseInput = {
            identifier: 'project-configuration',
            creator: {
                username: 'test',
                password: 'test'
            }
        };

        const result: ProjectConfigurationAggregateRootState = await saveProjectConfigurationUseCase.run(saveConfigurationDTO);
        const savedConfiguration: MaybeUndefined<ProjectConfigurationAggregateRootState> = await unitOfWork.getProjectConfigurationProvider().findOneById(result.id!);
        expect(savedConfiguration).toBeDefined();
    });

    it('should not save a project configuration with existing data', async (): Promise<void> => {
        const hashedPassword: IHashedPassword = await unitOfWork
            .getPasswordManager()
            .generateFromPlainText('test');

        await unitOfWork.getUserRepository().save({
            username: 'test',
            hashedPassword: hashedPassword.toString(),
            admin: true
        });

        const savedConfigurationDTO: SaveProjectConfigurationUseCaseInput = {
            identifier: 'project-configuration',
            creator: {
                username: 'test',
                password: 'test'
            }
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
});
