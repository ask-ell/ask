import { NestFactory } from "@nestjs/core";
import { INestApplication } from "@nestjs/common";
import { IServerProvider } from "@ask-ell/core";
import { AddOnWrapper } from "@ask-ell/back-end";

import { AppModule } from "./app.module";


export async function createBackend(): Promise<IServerProvider> {
    const application: INestApplication = await NestFactory.create(AppModule);

    new AddOnWrapper({
        swagger: {
            title: 'Ask Back-end API'
        }
    }).apply(application);

    return application;
};
