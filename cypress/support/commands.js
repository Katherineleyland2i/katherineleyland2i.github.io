// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add('login', (username, password) => {
    // Visit the homepage (if not already in the URL)
    cy.visit('/');

    // Ensure the username and password fields are visible
    cy.get('#username').should('be.visible').type(username);  // Targeting #username directly
    cy.get('#password').should('be.visible').type(password);  // Targeting #password directly
    
    // Ensure the login button is visible and clickable
    cy.get('button').contains('Login').should('be.visible').click();

});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })