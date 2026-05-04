import { ILogger } from "@ask-ell/core";
import signale from 'signale';


export class SignaleLogger implements ILogger {
    log(...data: any[]): void {
        signale.log(...data);
    }

    info(...data: any[]): void {
        signale.info(...data);
    }

    warn(...data: any[]): void {
        signale.warn(...data);
    }

    error(...data: any[]): void {
        signale.error(...data);
    }
}