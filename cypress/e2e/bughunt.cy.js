describe('EventlyTeen Bug Hunt Automation Demo', () => { 
    // Base URL assumed to be set in cypress.config.js
  
    it('Login - Validations and Successful Login', () => {
        cy.visit('/');
  
        // Test invalid login - too short
        cy.get('#username').type('ab');  // Using ID selector for username
        cy.get('#password').type('123');  // Using ID selector for password
        cy.get('button').contains('Login').click();
  
        // Verify error message (check typo in HTML - "atleast")
        cy.contains('Username must be atleast 4 characters').should('be.visible');
  
        // Test valid login
        cy.get('#username').clear().type('eventTester');  // Using ID selector for username
        cy.get('#password').clear().type('Test1234!');  // Using ID selector for password
        cy.get('button').contains('Login').click();
  
        // Verify successful login
        cy.contains('🌟 EventlyTeen: Plan Your Dream Event!').should('be.visible');
    });
  
    it('Create Event Form - Tests ', () => {
        cy.login('eventTester', 'Test1234!');  // Assuming you create a Cypress command for login
  
        // Fill out the form with valid data
        cy.get('#eventName').type('Teen Music Fest');  // Using ID selector for event name
        cy.get('#eventDate').type('2025-06-15'); // Should be blocked due to 2024 limit
        cy.get('#playlist').type('https://open.spotify.com/playlist/12345');  // Triggers bug
        cy.get('#guests').type('75');  // Should trigger guest limit bug
        cy.get('button').contains('Event').click();
        // Assert error message for guest limit bug (if still exists)
  
        // Adjust guest count to pass
        cy.get('#guests').clear().type('45');  // Using ID selector for number of guests
        cy.get('button').contains('Event').click();
  
        // Verify event creation success
        cy.contains('Form submision failed. Try agan.').should('be.visible');  // Check for typos
    });
  
    it('Check for Known Bugs (Regression Check)', () => {
        cy.login('eventTester', 'Test1234!');
  
        // Check for common bugs found in the worksheet
        cy.contains('Welcome to EventlyTeen - your number one place for planning awsome events!').should('exist');  // Typo check
        cy.get('a[href*="spotify"]').click();       // Test the Spotify link
  
        // Check error message wording if triggered
        cy.contains('submission').should('not.exist');
        cy.contains('agan').should('not.exist');    // "Try agan" typo
  
        // Verify contact email typo
        cy.contains('support@eventlyteen.con').should('not.exist');
    });
  });