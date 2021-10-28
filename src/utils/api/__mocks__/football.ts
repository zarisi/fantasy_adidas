import {randomPlayer, randomTeam} from "../../test/test-helper";

export const getCurrentWCTeams = async () => {
    return new Promise((resolve, reject) => {
        resolve( {
            teams: [
                //We add a random team with the ID 1 so we can test interactions with it
                randomTeam(1,'Number One', 'ONE'),randomTeam(),randomTeam(),
            ]
        })
    });
}

/** Obtain the teams for the current WC **/
export const getTeams = async (id: number) => {
    return new Promise((resolve, reject) => {
        resolve( {
            squad: [
                //We add a random team with the ID 1 so we can test interactions with it
                randomPlayer(1,'Number One'),randomPlayer(),randomPlayer(),
            ]
        })
    });
}
