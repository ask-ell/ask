import { IProjectConfigurationDTO } from "../dto/project-configuration.dto.interface";
import { Id } from "../types/id";


export interface IProjectConfigurationController {
    findOne(projectConfigurationId: Id): Promise<IProjectConfigurationDTO>;
}
