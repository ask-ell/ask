import { GetProjectTasksUseCase, IProjectState, ITaskState, IProjectConfigurationState, IUnitOfWork, IGetProjectTasksUseCase } from "../application";

import { TestUnitOfWork } from './test.unit-of-work';


describe(GetProjectTasksUseCase.name, (): void => {
    let unitOfWork: IUnitOfWork;
    let getProjectTasksUseCase: IGetProjectTasksUseCase;

    beforeEach((): void => {
        unitOfWork = new TestUnitOfWork();
        getProjectTasksUseCase = new GetProjectTasksUseCase(unitOfWork);
    });

    it("should return empty array for a project without tasks and without extensions", async (): Promise<void> => {
        const project: IProjectState = {};
        const tasks: ITaskState[] = await getProjectTasksUseCase.run(project);
        expect(tasks).toEqual([]);
    });

    it("should return project tasks for a project with tasks and without extensions", async (): Promise<void> => {
        const projectTasks: ITaskState[] = [
            {
                id: "task",
                instructions: ["Do something"]
            }
        ];

        const project: IProjectState = {
            tasks: projectTasks
        };
        const tasks: ITaskState[] = await getProjectTasksUseCase.run(project);
        expect(tasks).toEqual(projectTasks);
    });

    it("should return project configuration tasks for a project without tasks and with extensions", async (): Promise<void> => {
        const projectConfiguration: IProjectConfigurationState = {
            id: "project-configuration",
            version: "1.0.0",
            tasks: [
                {
                    id: "task-1",
                    instructions: ["Do something"]
                },
                {
                    id: "task-2",
                    instructions: ["Do something else"]
                }
            ]
        };

        await unitOfWork.getProjectConfigurationRepository().save(projectConfiguration);

        const project: IProjectState = {
            extends: [
                {
                    id: projectConfiguration.id
                }
            ]
        };
        const tasks: ITaskState[] = await getProjectTasksUseCase.run(project);
        expect(tasks.length).toEqual(projectConfiguration.tasks?.length);
    });

    it("should return one task perr id", async (): Promise<void> => {
        const projectConfiguration: IProjectConfigurationState = {
            id: "project-configuration",
            version: "1.0.0",
            tasks: [
                {
                    id: "task",
                    instructions: ["Do something"]
                },
                {
                    id: "task",
                    instructions: ["Do something else"]
                }
            ]
        };

        await unitOfWork.getProjectConfigurationRepository().save(projectConfiguration);

        const project: IProjectState = {
            extends: [
                {
                    id: projectConfiguration.id
                }
            ]
        };
        const tasks: ITaskState[] = await getProjectTasksUseCase.run(project);
        expect(tasks.length).toEqual(1);
    });
});
