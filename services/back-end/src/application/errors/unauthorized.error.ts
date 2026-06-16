import { ApplicationError } from "@ask-ell/core/dist/src/hexa";


export class UnauthorizedError extends ApplicationError {
    constructor() {
        super('Unauthorized');
    }
}
