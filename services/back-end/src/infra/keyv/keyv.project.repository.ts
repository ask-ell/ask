import { KeyvAggregateRootRepository } from "@ask-ell/keyv";

import { IProjectDTO } from "@ask/back-end-api";


export class KeyvProjectRepository extends KeyvAggregateRootRepository<IProjectDTO, IProjectDTO> {
    protected override purgeData({
        id,
        configuration,
        type,
        tasks
    }: IProjectDTO): IProjectDTO {
        return {
            id,
            configuration,
            type,
            tasks
        };
    }
}
