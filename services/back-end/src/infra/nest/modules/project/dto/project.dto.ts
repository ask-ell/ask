import { Id, IProjectDTO, ITaskDTO } from '@ask-ell/back-end-api';


export class ProjectDTO implements IProjectDTO {
    id!: Id;
    type!: 'project';
    configuration!: Id;
    tasks?: ITaskDTO[];
}
