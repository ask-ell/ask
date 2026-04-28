import { IProjectDTO } from "../dto/project.dto.interface";
import { Id } from "../types/id";


export interface IProjectController {
    findOne(projectId: Id): Promise<IProjectDTO>;
}
