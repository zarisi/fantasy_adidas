import {render, screen} from "@testing-library/react";
import {
    randomPlayer,
    randomTeam,
    testInitialStateWithSearched,
    testProviderWrapper, testStoreManual
} from "../../utils/test/test-helper";
import Teams from "../teams/teams";
import React from "react";
import PlayerSearch from "./player-search";
import {configureStore, createStore} from "@reduxjs/toolkit";
import teamReducer from "../../store/teams-slice";
import {Team} from "../../types/team";
import {Player} from "../../types/player";
import {Provider} from "react-redux";
import * as reactRedux from 'react-redux'
import {loadState} from "../../store/store";

jest.mock("../../utils/api/football");

describe("PlayerSearch", () => {

    it("should display the initial state of the component", async () => {

        render(
            testProviderWrapper(
                <PlayerSearch/>
            )
        )

        const coachs = await screen.findByText('There are no coachs available for your search');
        const goalkeepers = await screen.findByText('There are no goalkeepers available for your search');
        const defenders = await screen.findByText('There are no defenders available for your search');
        const midfielders = await screen.findByText('There are no midfielders available for your search');
        const attackers = await screen.findByText('There are no attackers available for your search');

        expect(coachs).toBeTruthy();
        expect(goalkeepers).toBeTruthy();
        expect(defenders).toBeTruthy();
        expect(midfielders).toBeTruthy();
        expect(attackers).toBeTruthy();
    });

    it("should display one player per position", async () => {

        const teamState = testInitialStateWithSearched;
        teamState.searchedPlayers = [{
            id: Math.random(),
            position: 'Goalkeeper',
            name: 'player-goalkeeper',
            dateOfBirth: '10/10/2010',
            role: 'PLAYER',
        }, {
            id: Math.random(),
            position: 'Defender',
            name: 'player-defender',
            dateOfBirth: '10/10/2010',
            role: 'PLAYER',
        }, {
            id: Math.random(),
            position: 'Midfielder',
            name: 'player-midfielder',
            dateOfBirth: '10/10/2010',
            role: 'PLAYER',
        }, {
            id: Math.random(),
            position: 'Attacker',
            name: 'player-attacker',
            dateOfBirth: '10/10/2010',
            role: 'PLAYER',
        }, {
            id: Math.random(),
            position: undefined,
            name: 'player-coach',
            dateOfBirth: '10/10/2010',
            role: 'COACH',
        },]

        const store = testStoreManual(teamState);
        render(
            testProviderWrapper(
                <PlayerSearch/>,store
            )
        )

        const coachs = await screen.findByText('player-coach');
        const goalkeepers = await screen.findByText('player-goalkeeper');
        const defenders = await screen.findByText('player-defender');
        const midfielders = await screen.findByText('player-midfielder');
        const attackers = await screen.findByText('player-attacker');

        expect(coachs).toBeTruthy();
        expect(goalkeepers).toBeTruthy();
        expect(defenders).toBeTruthy();
        expect(midfielders).toBeTruthy();
        expect(attackers).toBeTruthy();
    });
});

