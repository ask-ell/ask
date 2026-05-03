import Keyv from "keyv";
import { KeyvAggregateRootRepository } from "@ask-ell/keyv";

import { IProjectDTO } from "@ask/back-end-api";

import { askProject } from "./data";


export class KeyvProjectRepository extends KeyvAggregateRootRepository<IProjectDTO, IProjectDTO> {
    constructor(instance: Keyv<IProjectDTO>) {
        super(instance);
        this.instance.set(askProject.id, askProject);
    }

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
        }
    }
}
