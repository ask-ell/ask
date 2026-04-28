import { Id, IProjectDTO, ITaskDTO } from '@ask-ell/back-end-api';


export class ProjectDTO implements IProjectDTO {
    id!: Id;
    configuration!: Id;
    tasks?: ITaskDTO[];
}
