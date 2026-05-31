import { IResult, ok } from "@ask-ell/core";
import { AggregateRoot } from "@ask-ell/core/dist/src/ddd";

import { IProjectConfigurationState } from "./project-configuration.state.interface";
import { IProjectConfiguration } from "./project-configuration.interface";


export class ProjectConfiguration extends AggregateRoot<IProjectConfigurationState> implements IProjectConfiguration {
    checkStateValidity(): IResult {
        return ok();
    }

    isEqual(otherProjectConfiguration: IProjectConfiguration): boolean {
        const snapshot: any = this.getSnapshot();
        delete snapshot.id;
        delete snapshot.version;

        const otherProjectConfigurationSnapshot: any = otherProjectConfiguration.getSnapshot();
        delete otherProjectConfigurationSnapshot.id;
        delete otherProjectConfigurationSnapshot.version;

        // console.log({
        //     snapshot: JSON.stringify(snapshot),
        //     otherProjectConfigurationSnapshot: JSON.stringify(otherProjectConfigurationSnapshot)
        // });

        return JSON.stringify(snapshot) === JSON.stringify(otherProjectConfigurationSnapshot);
    }
}
