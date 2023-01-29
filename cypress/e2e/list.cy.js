/// <reference types="cypress" />

// This spec file contains a variety of tests for the List app.

// The tests are written using the Cypress API.
// https://on.cypress.io/api

describe("List app", () => {
    beforeEach(() => {
        // Intercept HTTP requests
        cy.intercept("/players", {
            status: "ok",
            data: [
                {
                    id: 2,
                    name: "Jhon",
                    team: "Cobrakay",
                    score: 1270,
                    createdAt: "2023-01-29 17:02:43.831 +00:00",
                    updatedAt: "2023-01-29 17:33:00.004 +00:00",
                },
                {
                    id: 1,
                    name: "Peter",
                    team: "Pandas",
                    score: 1129,
                    createdAt: "2023-01-29 17:02:43.831 +00:00",
                    updatedAt: "2023-01-29 17:31:50.004 +00:00",
                },
            ],
        }).as("getPlayers");
        cy.visit("http://localhost:3000");
    });

    it("displays two players with player names when the API response has two players", () => {
        cy.wait("@getPlayers");
        cy.get("[data-testid=player]").should("have.length", 2);

        cy.get("[data-testid=player]").first().should("include.text", "Jhon");
        cy.get("[data-testid=player]").last().should("include.text", "Peter");
    });

    it("can add new players", () => {
        const name = "Dutch";
        cy.intercept("GET", "/players").as("getPlayers");

        cy.intercept("POST", "/players", {
            status: "ok",
            data: { name: name, team: null, score: null },
        }).as("postPlayers");

        cy.get("input[name=name").type(`${name}{enter}`);

        // Wait for the POST request (adding a new player)
        cy.wait("@postPlayers");

        // Wait for the GET request (fetching all players)
        cy.wait("@getPlayers");
    });
});
