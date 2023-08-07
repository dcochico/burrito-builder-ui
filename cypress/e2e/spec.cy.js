describe("Home Page", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it.only("Should display title, form, and orders on page load", () => {
    cy.getData().as('getData')
    cy.wait('@getData').then(() => {
      cy.get('header').contains('h1', 'Burrito Builder')
        .get('form').find('input[type="text"]')
        .get('.ingredient-buttons').children().should('have.length', 12)
        .get('p').should('have.text', 'Order: Nothing selected')
        .get('button').last().should('have.text', 'Submit Order')
        .get('.order').should('have.length', 3)
        .get('.order').first().contains('h3', 'Pat')
        .get('.order').first().find('ul').children().should('have.length', 5)
        .get('.order').last().contains('h3', 'Alex')
        .get('.order').first().find('ul').children().should('have.length', 5)
    })
  });

  it('Should allow user to add new order', () => {})
  it('Should require name and at least one ingredient per order', () => {})
});