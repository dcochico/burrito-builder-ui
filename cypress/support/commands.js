Cypress.Commands.add('stubRequest', (method, code, fixture) => {
  return cy.intercept(method, "http://localhost:3001/api/v1/orders", {
    statusCode: code,
    fixture: fixture
  })
});

Cypress.Commands.add('getData', () => {
  cy.stubRequest('GET', 200, 'orders')
});

Cypress.Commands.add('postData', () => {
  cy.stubRequest('POST', 201, 'newOrder')
});