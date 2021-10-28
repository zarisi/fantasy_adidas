import {render, screen} from "@testing-library/react";
import {testInitialStateWithSearched, testProviderWrapper, testStoreManual} from "../../utils/test/test-helper";
import PlayerSearch from "../player-search/player-search";
import React from "react";
import {YourTeam} from "./your-team";

describe("PlayerSearch", () => {

    it("should display the initial state of the component", async () => {

        render(
            testProviderWrapper(
                <YourTeam/>
            )
        )

        const coachs = await screen.findByText('No coachs selected');
        const goalkeepers = await screen.findByText('No goalkeepers selected');
        const defenders = await screen.findByText('No defenders selected');
        const midfielders = await screen.findByText('No midfielders selected');
        const attackers = await screen.findByText('No attackers selected');

        expect(coachs).toBeTruthy();
        expect(goalkeepers).toBeTruthy();
        expect(defenders).toBeTruthy();
        expect(midfielders).toBeTruthy();
        expect(attackers).toBeTruthy();
    });

    it("should display one player per position", async () => {

        const teamState = testInitialStateWithSearched;
        teamState.selectedPlayers = [{
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
                <YourTeam/>,store
            )
        )

        const coachs = await screen.findByText('player-coach');
        const goalkeepers = await screen.findByText('player-goalkeeper');
        const defenders = await screen.findByText('player-defender');
        const midfielders = await screen.findByText('player-midfielder');
        const attackers = await screen.findByText('player-attacker');
        const coachsTotal = await screen.findByText('1/1');
        const playerTotal = await screen.findAllByText('1/4');


        expect(coachs).toBeTruthy();
        expect(coachsTotal).toBeTruthy();
        expect(goalkeepers).toBeTruthy();
        expect(defenders).toBeTruthy();
        expect(midfielders).toBeTruthy();
        expect(attackers).toBeTruthy();
        expect(coachsTotal).toBeTruthy();
        expect(playerTotal).toHaveLength(4);
    });
});

