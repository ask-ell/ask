import { ApplicationError } from "@ask-ell/core/dist/src/hexa";


export class DuplicatedProjectConfigurationError extends ApplicationError {
    constructor(identifier: string){
        super(`project configuration "${identifier}" is identical to the persisted entity`);
    }
}
