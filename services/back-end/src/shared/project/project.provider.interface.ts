import { IAggregateRootProvider } from "@ask-ell/core/dist/src/hexa";

import { IProjectDTO } from "@ask-ell/ask-back-end-api";


export interface IProjectProvider extends IAggregateRootProvider<IProjectDTO, IProjectDTO> {}
