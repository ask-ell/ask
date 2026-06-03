import { IFindOneProjectConfigurationDTO } from "../dto/inputs/find.one.project-configuration.dto.interface";
import { ISaveProjectConfigurationDTO } from "../dto/inputs/save.project-configuration.dto.interface";
import { IProjectConfigurationDTO } from "../dto/outputs/project-configuration.dto.interface";


export interface IProjectConfigurationController {
    findOne(dto: IFindOneProjectConfigurationDTO): Promise<IProjectConfigurationDTO>;
    save(dto: ISaveProjectConfigurationDTO): Promise<IProjectConfigurationDTO>;
}
