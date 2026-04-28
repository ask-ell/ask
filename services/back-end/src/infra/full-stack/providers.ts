import { Provider } from "@nestjs/common";

import { UNIT_OF_WORK_PROVIDER } from "../nest";
import { FullStackUnitOfWork } from "./full-stack.unit-of-work";


export const providers: Provider[] = [
    {
        provide: UNIT_OF_WORK_PROVIDER,
        useClass: FullStackUnitOfWork
    }
];