import { KeyvAggregateRootProvider } from "@ask-ell/keyv";

import { IProjectDTO } from "@ask-ell/ask-back-end-api";


export class ProjectKeyvProvider extends KeyvAggregateRootProvider<IProjectDTO, IProjectDTO> {}
