import { Id } from "@ask-ell/core/dist/src/ddd";
import { Observable } from "rxjs";

import { IProjectConfigurationRepository, IProjectConfigurationState } from "../../application";


export class HttpProjectConfigurationRepository implements IProjectConfigurationRepository {
    save(entityState: IProjectConfigurationState): Promise<IProjectConfigurationState> {
        throw new Error("Method not implemented.");
    }

    lastSavedEntity$(): Observable<IProjectConfigurationState> {
        throw new Error("Method not implemented.");
    }

    updateOne(aggregateRootState: IProjectConfigurationState): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    lastUpdatedEntity$(): Observable<IProjectConfigurationState> {
        throw new Error("Method not implemented.");
    }

    removeOne(id: Id): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    lastDeletedEntity$(): Observable<IProjectConfigurationState> {
        throw new Error("Method not implemented.");
    }
}
