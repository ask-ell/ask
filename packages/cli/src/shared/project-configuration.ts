import {
  HttpClient,
  ILogger,
  IResult,
  MaybeUndefined,
  fail,
  success,
} from '@ask-ell/core';

import {
  IProjectConfigurationDTO,
  IProjectConfigurationPartialDTO,
  IProjectDTO,
} from '@ask/back-end-api';


export type ProjectConfigurationProvider<Args extends any[]> = (
  ...args: Args
) => Promise<IProjectConfigurationDTO[]>;

export const getProjectConfigurations =
  ({
    logger,
  }: {
    logger: ILogger;
  }): ProjectConfigurationProvider<[IProjectDTO]> =>
  async (project: IProjectDTO): Promise<IProjectConfigurationDTO[]> => {
    const { extends: projectConfigurationPartials } = project;

    if (!projectConfigurationPartials) {
      return Promise.resolve([]);
    }

    // // TODO: extract
    const defaultRemote: string = 'http://localhost:3000';

    const projectConfigurationFetchingResults: IResult<IProjectConfigurationDTO>[] =
      await Promise.all(
        projectConfigurationPartials.map(
          async ({
            id,
            remote,
            version,
          }: IProjectConfigurationPartialDTO): Promise<
            IResult<IProjectConfigurationDTO>
          > => {
            // TODO: read files cache here

            const remoteUrl: URL = new URL(remote ?? defaultRemote);
            const url: URL = new URL(
              'project-configurations/one',
              remoteUrl
            );

            url.searchParams.append('id', id);
            if (version) {
              url.searchParams.append('version', version);
            }

            const projectConfigurationFetchingResult: IResult<IProjectConfigurationDTO> =
              await HttpClient.get<{ data: IProjectConfigurationDTO }>({
                // TODO: add as type ?
                url
              })
                .then(
                  (
                    response: IResult<{ data: IProjectConfigurationDTO }>,
                  ): IResult<IProjectConfigurationDTO> => {
                    return success(response.getData()!.data);
                  },
                )
                .catch((error: any): IResult => {
                  return fail(error);
                });

            if (projectConfigurationFetchingResult.isAFail()) {
              let errorMessage: string =
                projectConfigurationFetchingResult.getError().message;

              const errorData: MaybeUndefined<any> = (
                projectConfigurationFetchingResult.getError() as any
              ).data; // TODO: add type
              if (errorData?.message) {
                errorMessage = errorData.message;
              }

              logger.error(
                `Error for project configuration "${id}" : ${errorMessage}`,
              );
            }

            return projectConfigurationFetchingResult;
          },
        ),
      );

    // TODO: fetch nested configurations
    // TODO: store in cache here
    return projectConfigurationFetchingResults
      .filter(
        (
          projectConfigurationFetchingResult: IResult<IProjectConfigurationDTO>,
        ): boolean => projectConfigurationFetchingResult.isASuccess(),
      )
      .map(
        (
          projectConfigurationFetchingResult: IResult<IProjectConfigurationDTO>,
        ): IProjectConfigurationDTO =>
          projectConfigurationFetchingResult.getData()!,
      );
  };
