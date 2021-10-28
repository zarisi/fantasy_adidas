const token = '135ea01fdc754b839f729d4e7f44c21e';
const baseUrl = 'http://api.football-data.org';

const basicHeader = {'X-Auth-Token': token}
const basicFilter = '?plan=TIER_ONE'

/** Obtain the teams for the current WC **/
export const getCurrentWCTeams = async () => await fetch(baseUrl + '/v2/competitions/WC/teams' + basicFilter, {headers: basicHeader})
    .then(response => response.json())
    .catch((error) => {
        console.error('An error has ocurred', error);
        return {};
    });

/** Obtain the teams for the current WC **/
export const getTeams = async (id:number) => await fetch(baseUrl + '/v2/teams/' + id + basicFilter, {headers: basicHeader})
    .then(response => response.json())
    .catch((error) => {
        console.error('An error has ocurred', error);
        return {};
    });
