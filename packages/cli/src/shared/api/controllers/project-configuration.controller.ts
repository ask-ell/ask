import { HttpClient, IResult } from "@ask-ell/core";

import { IFindOneProjectConfigurationDTO, IProjectConfigurationController, IProjectConfigurationDTO } from "@ask/back-end-api";


export class ProjectConfigurationController implements IProjectConfigurationController {
    constructor(
        private remoteUrl: URL
    ) {}

    async findOne({
        id,
        version
    }: IFindOneProjectConfigurationDTO): Promise<IProjectConfigurationDTO> {
        const url: URL = new URL(
            `project-configurations/${id}`,
            this.remoteUrl
        );

        if (version) {
            url.searchParams.append('version', version);
        }

        return HttpClient.get<{ data: IProjectConfigurationDTO }>({
            // TODO: add as type from @ask-ell/core ?
            url
        }).then(
            (result: IResult<{ data: IProjectConfigurationDTO; }>): IProjectConfigurationDTO => result.getData()?.data!
        );
    }
}
