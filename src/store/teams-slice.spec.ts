import teamsReducer, {
    TeamState,
    selectTeam,
    clearTeams,
    renewSearchedPlayers,
    addPlayer,
    removePlayer
} from './teams-slice';
import {Team} from "../types/team";
import {Player} from "../types/player";
import {
    randomPlayer,
    randomTeam,
    testDefaultInitialState,
    testInitialStateWithSearched
} from "../utils/test/test-helper";

describe('teams reducer', () => {

    it('should handle initial state', () => {
        expect(teamsReducer(undefined, { type: 'unknown' })).toEqual({
            teams: [] as Team[],
            selectedTeam: undefined,
            selectedPlayers: [] as Player[],
            searchedPlayers: [] as Player[],
        });
    });

    it('should handle searched players from a selected team', () => {
        const testIndividualPlayer = randomPlayer();
        const testPlayerList = [randomPlayer(),randomPlayer(),testIndividualPlayer,randomPlayer()];
        const actual = teamsReducer(testDefaultInitialState, renewSearchedPlayers(testPlayerList));
        expect(actual.searchedPlayers).not.toMatchObject([]);
        expect(actual.searchedPlayers).toHaveLength(4);
        expect(actual.searchedPlayers).toContain(testIndividualPlayer);
    });

    it('should handle teams renew', () => {
        const testTeam = randomTeam();
        const actual = teamsReducer(testDefaultInitialState, selectTeam(testTeam));
        expect(actual.selectedTeam).not.toBeUndefined();
        expect(actual.selectedTeam).toHaveProperty('id',testTeam.id);
    });

    it('should handle teams clear', () => {
        const actual = teamsReducer(testDefaultInitialState, clearTeams());
        expect(actual.teams).toEqual([]);
    });

    it('should add a player', () => {
       const actual = teamsReducer(testInitialStateWithSearched, addPlayer(5));
        expect(actual.selectedPlayers).toHaveLength(2);
    });

    it('should not add the same player', () => {
        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});
        const actual = teamsReducer(testInitialStateWithSearched, addPlayer(1));
        expect(consoleSpy).toHaveBeenCalled();
        expect(actual.selectedPlayers).toHaveLength(1);
    });

    it('should not add more than 4 players from same team', () => {
        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});
        const initialState: TeamState = {
            teams: [] as Team[],
            selectedTeam: undefined,
            selectedPlayers: [...Array(4).fill(randomPlayer())] as Player[],
            searchedPlayers: [randomPlayer(5)] as Player[],
        };
        const actual = teamsReducer(initialState, addPlayer(5));
        expect(consoleSpy).toHaveBeenCalled();
        expect(actual.selectedPlayers).toHaveLength(4);
    });

    it('should not add more than 16 players', () => {
        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});
        const initialState: TeamState = {
            teams: [] as Team[],
            selectedTeam: undefined,
            selectedPlayers: [...Array(16).fill(randomPlayer())] as Player[],
            searchedPlayers: [randomPlayer(5)] as Player[],
        };
        const actual = teamsReducer(initialState, addPlayer(5));
        expect(consoleSpy).toHaveBeenCalled();
        expect(actual.selectedPlayers).toHaveLength(16);
    });

    it('should remove a player', () => {
        const actual = teamsReducer(testInitialStateWithSearched, removePlayer(1));
        expect(actual.selectedPlayers).toHaveLength(0);
    });

});
