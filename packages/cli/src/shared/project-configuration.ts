import {
  ILogger,
  IResult,
  MaybeUndefined,
  fail,
  success,
} from '@ask-ell/core';

import {
  IProjectConfigurationDTO,
  IProjectConfigurationPartialDTO,
  IProjectDTO
} from '@ask/back-end-api';

import { RootOptions } from './options';
import { getDefaultRemote } from './remote';
import { writeProjectConfigurationCache } from './cache';
import { ProjectConfigurationController } from './api';


export type ProjectConfigurationProvider<Args extends any[]> = (
  ...args: Args
) => Promise<IProjectConfigurationDTO[]>;

export const getProjectConfigurations =
  ({
    logger,
    rootOptions: {
      storage,
      remote
    }
  }: {
    logger: ILogger;
    rootOptions: RootOptions
  }): ProjectConfigurationProvider<[IProjectDTO]> =>
  async (project: IProjectDTO): Promise<IProjectConfigurationDTO[]> => {
    const { extends: projectConfigurationPartials } = project;

    if (!projectConfigurationPartials) {
      return Promise.resolve([]);
    }

    const defaultRemote: string = remote ?? getDefaultRemote();

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
            const remoteUrl: URL = new URL(remote ?? defaultRemote);

            // TODO: read files cache here

            const projectConfigurationFetchingResult: IResult<IProjectConfigurationDTO> =
              await new ProjectConfigurationController(remoteUrl)
                .findOne({
                  id,
                  version
                })
                .then(
                  async (data: IProjectConfigurationDTO): Promise<IResult<IProjectConfigurationDTO>> => {
                    await writeProjectConfigurationCache({
                      data,
                      logger,
                      remoteUrl,
                      storage
                    });
                    return success(data);
                  }
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
