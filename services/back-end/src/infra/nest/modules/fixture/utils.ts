import { Fixture } from "../../../../shared/fixtures";


export function sortFixtures(fixtureA: Fixture, fixtureB: Fixture): number {
    if(fixtureA.type === 'user') {
        return -1;
    }
    if(fixtureB.type === 'user') {
        return 1;
    }
    return 0;
}
