/* eslint-env jest */
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
require("@testing-library/jest-dom/extend-expect");
require("@testing-library/jest-dom");

import List from "./List";

const nock = require("nock");

const API_GET_RESPONSE_DATA = () => [
    {
        id: 1,
        name: "Peter",
        team: "Pandas",
        score: 7453,
        createdAt: "2023-01-28 11:53:28.757 +00:00",
        updatedAt: "2023-01-28 16:32:30.004 +00:00",
    },
    {
        id: 3,
        name: "Tommy",
        team: "Space",
        score: 7004,
        createdAt: "2023-01-28 11:53:28.757 +00:00",
        updatedAt: "2023-01-28 16:31:55.003 +00:00",
    },
    {
        id: 2,
        name: "Jhon",
        team: "Cobrakay",
        score: 6766,
        createdAt: "2023-01-28 11:53:28.757 +00:00",
        updatedAt: "2023-01-28 16:32:50.004 +00:00",
    },
];

describe("List", () => {
    beforeEach(() => {
        nock.cleanAll();
        // List component always makes a GET call to the API.
        // Mock the API GET call:
        nock("http://localhost:80", { encodedQueryParams: true })
            .get("/players")
            .times(1)
            .reply(200, {
                status: "ok",
                data: API_GET_RESPONSE_DATA(),
            });
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it("should render table with a player list", async () => {
        // Act
        render(<List />);
        // Assert
        screen.getByText("Player");
        screen.getByText("Score");
        screen.getByText("Actions");
        await waitFor(() => {
            // First player:
            expect(screen.getByText("Peter")).toBeInTheDocument();
            expect(screen.getByText("Pandas")).toBeInTheDocument();
            // Second player:
            expect(screen.getByText("Tommy")).toBeInTheDocument();
            expect(screen.getByText("Space")).toBeInTheDocument();
            // Third player:
            expect(screen.getByText("Jhon")).toBeInTheDocument();
            expect(screen.getByText("Cobrakay")).toBeInTheDocument();
        });
    });

    it("should render form to add new players", async () => {
        // Arrange
        render(<List />);
        // Act
        screen.getByText("Add new players");
        const player_name = screen.getByLabelText("Player name");
        expect(player_name.getAttribute("placeholder")).toBe("player name");

        const team_name = screen.getByLabelText("Team name");
        expect(team_name.getAttribute("placeholder")).toBe("team name");

        const team_score = screen.getByLabelText("Team score");
        expect(team_score.getAttribute("placeholder")).toBe("team score");
    });

    it("should let me add a new player to the list", async () => {
        // Mock the API GET call:
        nock("http://localhost:80", { encodedQueryParams: true })
            .get("/players")
            .times(1)
            .reply(200, () => {
                const data = API_GET_RESPONSE_DATA();
                const NEW_PLAYER = {
                    id: 4,
                    name: "Daniel LaRusso",
                    team: "Miyagi Dojo",
                    score: "1021",
                    createdAt: "2023-01-28 11:53:28.757 +00:00",
                    updatedAt: "2023-01-28 11:53:28.757 +00:00",
                };
                return {
                    status: "ok",
                    data: [...data, NEW_PLAYER],
                };
            })
            .post("/players", { name: "Miyagi Dojo", team: null, score: "999" })
            .reply(200, () => {
                return {
                    status: "ok",
                    data: {
                        name: "Daniel LaRusso",
                        team: "Miyagi Dojo",
                        score: "999",
                    },
                };
            });

        // Arrange
        render(<List />);
        // Act
        screen.getByText("Add new players");
        screen.getByRole("button", { name: "Add" });

        await waitFor(() => {
            // First player:
            expect(screen.getByText("Peter")).toBeInTheDocument();
        });
        const player_name_input = screen.getByLabelText("Player name");
        fireEvent.change(player_name_input, {
            target: { value: "Daniel LaRusso" },
        });
        const team_name_input = screen.getByLabelText("Player name");
        fireEvent.change(team_name_input, { target: { value: "Miyagi Dojo" } });
        const team_score_input = screen.getByLabelText("Team score");
        fireEvent.change(team_score_input, { target: { value: "999" } });
        fireEvent.click(screen.getByRole("button", { name: "Add" }));

        await waitFor(() => {
            expect(screen.getByText("Daniel LaRusso")).toBeInTheDocument();
            expect(screen.getByText("Miyagi Dojo")).toBeInTheDocument();
        });
    });

    it("should match the same snapshot", async () => {
        // Snapshot tests are not good tests :(
        // They should never be the only tests!
        // But they help detect unexpected changes in the rendered HTML
        // const { asFragment } = render(<List />);
        expect(<List />).toMatchSnapshot();
    });
});
