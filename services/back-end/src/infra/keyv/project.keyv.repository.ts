import Keyv from "keyv";
import { KeyvAggregateRootRepository } from "@ask-ell/keyv";

import { IProjectDTO } from "@ask-ell/ask-back-end-api";

import { askProject } from "./data/projects";


export class ProjectKeyvRepository extends KeyvAggregateRootRepository<IProjectDTO, IProjectDTO> {
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