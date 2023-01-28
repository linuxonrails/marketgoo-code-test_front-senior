import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import List from "./List";

describe("List", () => {
    it("should render table with a player list", async () => {
        // Arrange & Act
        render(<List />);
        // Assert
        screen.getByText("Player");
        screen.getByText("Score");
        screen.getByText("Actions");
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
        // Arrange
        render(<List />);
        // Act
        screen.getByText("Add new players");
        screen.getByRole("button", { name: "Add" });
        const player_name_input = screen.getByLabelText("Player name");
        fireEvent.change(player_name_input, {
            target: { value: "Daniel LaRusso" },
        });
        const team_name_input = screen.getByLabelText("Player name");
        fireEvent.change(team_name_input, { target: { value: "Miyagi Dojo" } });
        const team_score_input = screen.getByLabelText("Team score");
        fireEvent.change(team_score_input, { target: { value: "99" } });
        fireEvent.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText("Daniel LaRusso")).toBeInTheDocument();
        });
        // await screen.findByText("Miyagi Dojo");
        // await screen.findByText("111");
    });

    it("should match the same snapshot", () => {
        // Snapshot tests are not good tests :(
        // They should never be the only tests!
        // ...but they help detect unexpected changes in the rendered HTML
        const { asFragment } = render(<List />);
        expect(asFragment(<List />)).toMatchSnapshot();
    });
});
