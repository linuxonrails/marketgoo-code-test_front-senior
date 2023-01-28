/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("List app", () => {
    beforeEach(() => {
        // Reset DB:
        // !TODO: refact index.js to export a function to reset the DB and call it here

        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit("http://localhost:3000");
    });

    xit("displays three player by default", () => {
        cy.get("[data-testid=player]").should("have.length", 3);

        // TODO: get all and check if they are there
        cy.get("[data-testid=players]")
            .should("include.text", "Tommy")
            .should("include.text", "Jhon")
            .should("include.text", "Peter");
        // cy.get(".todo-list li").last().should("have.text", "Pandas");
    });

    it("can add new players", () => {
        const name = "Dutch";
        cy.intercept("GET", "/players").as("getPlayers");

        cy.get("input[name=name").type(`${name}{enter}`);

        cy.wait("@getPlayers");
        cy.get("[data-testid=player]")
            // .should("have.length", 4)
            .last()
            .should("include.text", name);
    });
});
