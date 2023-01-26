import React from "react";
import { render, screen } from "@testing-library/react";
import List from "./List";

describe("List", () => {
    it("should render table with a player list", () => {
        // Arranage
        render(<List />);
        // Act
        screen.getByText("Player");
        screen.getByText("Score");
        screen.getByText("Actions");
    });

    it("should render form to add new players", () => {
        // Arranage
        render(<List />);
        // Act
        screen.getByText("Add new players");
        screen.getByRole("button", { name: "Add" });
    });
});
