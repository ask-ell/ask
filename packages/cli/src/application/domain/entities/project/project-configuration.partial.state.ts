import { Id } from "@ask-ell/core/dist/src/ddd";


export interface IProjectConfigurationPartialState {
    id: Id;
    version?: string;
    remote?: string;
}
