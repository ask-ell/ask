import { HttpClient, ILogger, IResult, fail } from "@ask-ell/core";
import { IProjectConfigurationDTO, IProjectConfigurationPartialDTO, IProjectDTO } from "@ask/back-end-api";


export type ProjectConfigurationProvider<Args extends any[]> = (...args: Args) => Promise<IProjectConfigurationDTO[]>;

export const getProjectConfigurations = ({
    logger
}: {
    logger: ILogger
}): ProjectConfigurationProvider<[IProjectDTO]> => async (project: IProjectDTO): Promise<IProjectConfigurationDTO[]> => {
    const { extends: projectConfigurationPartials } = project;

    if(!projectConfigurationPartials) {
        return Promise.resolve([]);
    }

    // // TODO: extract
    const defaultRemote: string = 'http://localhost:3000';

    const projectConfigurationFetchingResults: IResult<IProjectConfigurationDTO>[] = await Promise.all(
        projectConfigurationPartials.map(
            async ({ id, remote, version }: IProjectConfigurationPartialDTO): Promise<IResult<IProjectConfigurationDTO>> => {
                // TODO: read files cache here

                const remoteUrl: URL = new URL(remote ?? defaultRemote);
                let path: string = `project-configurations/${id}`;

                if(version) {
                    path += `/${version}`;
                }

                const projectConfigurationFetchingResult: IResult<IProjectConfigurationDTO> = await HttpClient
                    .get<IProjectConfigurationDTO>({
                        url: new URL(path, remoteUrl)
                    })
                    .catch((error: any): IResult => {
                        return fail(error);
                    });

                if(projectConfigurationFetchingResult.isAFail()) {
                    logger.error(`Error for project configuration "${id}" : ${projectConfigurationFetchingResult.getError().message}`);
                }

                return projectConfigurationFetchingResult;
            }
        )
    );

    // TODO: fetch nested configurations
    // TODO: store in cache here
    return projectConfigurationFetchingResults
        .filter((projectConfigurationFetchingResult: IResult<IProjectConfigurationDTO>): boolean => projectConfigurationFetchingResult.isASuccess())
        .map((projectConfigurationFetchingResult: IResult<IProjectConfigurationDTO>): IProjectConfigurationDTO => projectConfigurationFetchingResult.getData()!);
}
