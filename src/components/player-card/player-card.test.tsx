import React from "react";
import {screen, render} from "@testing-library/react";
import PlayerCard from "./player-card"
import {Player} from "../../types/player";
import {testProviderWrapper, testStore} from "../../utils/test/test-helper";

const testPlayer = {
    id: 5,
    name: 'Player Name',
    team: 'Player Team',
    dateOfBirth: '1993-08-16T00:00:00Z' // 16/8/1993
} as Player;

describe("playerCard", () => {
    it("should display all the player props", async () => {

        render(
            testProviderWrapper(
                <PlayerCard player={testPlayer} canAddToTeam={false} canRemoveFromTeam={false}/>
            )
        )

        const playerName = await screen.findByText('Player Name');
        const playerTeam = await screen.findByText('Player Team');
        const playerBirth = await screen.findByText("16/8/1993");

        expect(playerName).toBeTruthy();
        expect(playerTeam).toBeTruthy();
        expect(playerBirth).toBeTruthy();
    });

    it("should display the add player button", async () => {

        render(
            testProviderWrapper(
                <PlayerCard player={testPlayer} canAddToTeam={true} canRemoveFromTeam={false}/>
            )
        )

        const addButton = await screen.findByText("Add player to your team");

        expect(addButton).toBeTruthy();
    });

    it("should display te remove button", async () => {

        render(
            testProviderWrapper(
                <PlayerCard player={testPlayer} canAddToTeam={false} canRemoveFromTeam={true}/>
            )
        )

        const playerName = await screen.findByText('Remove player from your team');

        expect(playerName).toBeTruthy();
    });
});
