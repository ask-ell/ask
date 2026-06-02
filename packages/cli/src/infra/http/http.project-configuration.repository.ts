import { Observable } from "rxjs";

import { IProjectConfigurationRepository, IProjectConfigurationState } from "../../application";


export class HttpProjectConfigurationRepository implements IProjectConfigurationRepository {
    save(): Promise<IProjectConfigurationState> {
        throw new Error("Method not implemented.");
    }

    lastSavedEntity$(): Observable<IProjectConfigurationState> {
        throw new Error("Method not implemented.");
    }

    updateOne(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    lastUpdatedEntity$(): Observable<IProjectConfigurationState> {
        throw new Error("Method not implemented.");
    }

    removeOne(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    lastDeletedEntity$(): Observable<IProjectConfigurationState> {
        throw new Error("Method not implemented.");
    }
}
