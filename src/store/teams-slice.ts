import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Player} from "../types/player";
import {Team} from "../types/team";
import {RootState} from "./store";

export interface TeamState {
    teams: Team[];
    selectedTeam?: Team;
    selectedPlayers: Player[];
    searchedPlayers: Player[];
}

const initialState: TeamState = {
    teams: [] as Team[],
    selectedTeam: undefined,
    selectedPlayers: [] as Player[],
    searchedPlayers: [] as Player[],
};

export const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        selectTeam: (state, action: PayloadAction<Team>) => {
            state.selectedTeam = action.payload;
        },
        clearTeams: (state) => {
            state.teams = [];
        },
        renewSearchedPlayers: (state, action: PayloadAction<Player[]>) => {
            state.searchedPlayers = action.payload;
        },
        addPlayer: (state, action: PayloadAction<number>) => {
            //look if the player is already selected
            let playerFound = state.selectedPlayers.find((({id}) => action.payload === id))
            //Search the player on the player list
            let playerSelected = state.searchedPlayers.find((({id}) => action.payload === id))
            if (playerFound !== undefined) {
                console.error("The player is already selected");
            } else if(playerSelected === undefined){
                console.error("Couldnt find the selected player");
            } else {
                if (state.selectedPlayers.length === 16) {
                    console.error("There is already 16 players selected");
                } else if(state.selectedTeam){
                    // @ts-ignore
                    let sameTeam = state.selectedPlayers.reduce((current, element) => state.selectedTeam.name === element.team ? current + 1 : current, 0)
                    if(sameTeam>=4){
                        console.error("There cant be more than 4 player from the same team")
                    }else{
                        let player = playerSelected;
                        player.team = state.selectedTeam.name;
                        state.selectedPlayers = [...state.selectedPlayers, player];
                    }
                }else{
                    console.error("There must be a team selected")
                }
            }
        },
        removePlayer: (state, action: PayloadAction<number>) => {
            state.selectedPlayers = state.selectedPlayers.filter(({id})=> id !== action.payload);
        }
    },
});

export const {selectTeam, clearTeams, renewSearchedPlayers, addPlayer, removePlayer} = teamsSlice.actions;

export const selectTeams = (state: RootState) => state.teams.teams;
export const selectSearchedPlayers = (state: RootState) => state.teams.searchedPlayers;
export const selectSelectedPlayers = (state: RootState) => state.teams.selectedPlayers;
export const selectSelectedTeam = (state: RootState) => state.teams.selectedTeam;

export const selectPlayersFromTeam = (state: RootState, teamId: number) => {
    const foundTeam = state.teams.teams.find((e) => e.id === teamId);
    if (foundTeam) {
        console.error("Not teams found for id " + teamId);
        return foundTeam.squad;
    }
    return [];
}

export default teamsSlice.reducer;
