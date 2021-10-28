import {getAllByText, render, screen} from "@testing-library/react";
import {testProviderWrapper} from "../../utils/test/test-helper";
import Teams from "./teams";
import React from "react";
import {flushSync} from "react-dom";

jest.mock("../../utils/api/football");

describe("teams", () => {
    it("should display the component", async () => {


        render(
            testProviderWrapper(
                <Teams/>
            )
        )

        const teamTLA = await screen.findAllByText('TLA');
        const teamName = await screen.findAllByAltText('TestTeam');

        expect(teamTLA).toBeTruthy();
        expect(teamName).toBeTruthy();
    });

    it("should select the team", async () => {
        render(
            testProviderWrapper(
                <Teams/>
            )
        )

        const button = await screen.findByText('ONE');
        button.click();

        //TODO implement a way to really check if the class for active is beign set

        expect(button).toBeTruthy();
    });
});
