import {configureStore, createStore} from "@reduxjs/toolkit";
import teamReducer, {TeamState} from "../../store/teams-slice";
import {Team} from "../../types/team";
import {Player} from "../../types/player";
import {Provider} from "react-redux";
import React from "react";

export const testDefaultInitialState: TeamState = {
    teams: [] as Team[],
    selectedTeam: undefined,
    selectedPlayers: [] as Player[],
    searchedPlayers: [] as Player[],
};

export const randomTeam = (id?:number, name?:string, tla?:string) => ({
    id: id ? id : Math.random(),
    name: name ? name : 'TestTeam',
    tla: tla ? tla : 'TLA'
}) as Team;

export const randomPlayer = (id?:number, team?:string) => ({
    id: id ? id : Math.random(),
    name: 'Name',
    team: team ? team : 'TestTeam',
}) as Player;

export const testInitialStateWithSearched: TeamState = {
    teams: [] as Team[],
    selectedTeam: randomTeam(),
    selectedPlayers: [randomPlayer(1)],
    searchedPlayers: [randomPlayer(1),randomPlayer(5),randomPlayer()] as Player[],
};

export const testStoreManual = (initialState:TeamState) => configureStore({
    reducer: {
        teams: teamReducer,
    },
    preloadedState: {
        teams: initialState
    }
});

export const testStore = configureStore({
    reducer: {
        teams: teamReducer,
    },
    preloadedState: {
        teams: testInitialStateWithSearched
    }
});

export const testProviderWrapper = (children:React.ReactElement, tStore = testStore) => (
    <Provider store={tStore}>{children}</Provider>
);
