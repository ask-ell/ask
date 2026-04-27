import { NestFactory } from "@nestjs/core";
import { IServerProvider } from "@ask-ell/core";

import { AppModule } from "./app.module";


export const createBackend = (): Promise<IServerProvider> => NestFactory.create(AppModule);
