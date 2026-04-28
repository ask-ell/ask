import { IAggregateRootRepository } from "@ask-ell/core/dist/src/hexa";

import { IProjectDTO } from "@ask-ell/ask-back-end-api";


export interface IProjectRepository extends IAggregateRootRepository<IProjectDTO, IProjectDTO> {}
