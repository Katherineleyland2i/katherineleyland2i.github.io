describe('EventlyTeen Bug Hunt Automation Demo', () => {
  // Base URL assumed to be set in cypress.config.js

  it('Login - Validations and Successful Login', () => {
      cy.visit('/login');

      // Test invalid login - too short
      cy.get('input[name="username"]').type('ab');
      cy.get('input[name="password"]').type('123');
      cy.get('button[type="submit"]').click();

      // Verify error message (assume the app shows one)
      cy.contains('Username must be at least 3 characters').should('be.visible');

      // Test valid login
      cy.get('input[name="username"]').clear().type('eventTester');
      cy.get('input[name="password"]').clear().type('Test1234!');
      cy.get('button[type="submit"]').click();

      // Verify successful login
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome to EventlyTeen').should('be.visible');
  });

  it('Create Event Form - Basic Tests', () => {
      cy.login('eventTester', 'Test1234!');  // Assuming you create a Cypress command for login

      cy.visit('/create-event');

      // Fill out the form with valid data
      cy.get('input[name="eventName"]').type('Teen Music Fest');
      cy.get('input[name="eventDate"]').type('2025-06-15');
      cy.get('input[name="playlist"]').type('https://open.spotify.com/playlist/12345');
      cy.get('input[name="numGuests"]').type('75');
      cy.get('button[type="submit"]').click();

      // Assert error message for guest limit bug (if still exists)
      cy.contains('Guest count cannot exceed 50').should('be.visible');

      // Adjust guest count to pass
      cy.get('input[name="numGuests"]').clear().type('45');
      cy.get('button[type="submit"]').click();

      // Verify event creation success
      cy.contains('Event successfully created!').should('be.visible');
  });

  it('Check for Known Bugs (Regression Check)', () => {
      cy.login('eventTester', 'Test1234!');
      cy.visit('/dashboard');

      // Check for common bugs found in the worksheet
      cy.contains('Welcom').should('not.exist');  // Typo check
      cy.get('a[href*="spotify"]').click();       // Test the Spotify link

      // Check error message wording if triggered
      cy.contains('submission').should('not.exist');
      cy.contains('agan').should('not.exist');

      // Verify contact email typo
      cy.contains('support@eventlyteen.con').should('not.exist');
  });
});
