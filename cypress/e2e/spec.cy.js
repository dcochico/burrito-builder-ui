describe("Home Page", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it("Should display title, form, and orders on page load", () => {
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
        .get('.order').first().find('ul').children().first().should('have.text', 'beans')
        .get('.order').first().find('ul').children().last().should('have.text', 'jalapeno')
        .get('.order').last().contains('h3', 'Alex')
        .get('.order').last().find('ul').children().should('have.length', 5)
        .get('.order').last().find('ul').children().first().should('have.text', 'sofritas')
        .get('.order').last().find('ul').children().last().should('have.text', 'queso fresco')
    })
  });

  it('Should allow user to add new order', () => {
    cy.getData().as('getData')
    cy.postData().as('postData')
    cy.wait('@getData').then(() => {
      cy.get('input[type="text"]').type('Dan')
        .get('.ingredient-buttons').children().first().click()
        .get('.ingredient-buttons').children().eq(1).click()
        .get('.ingredient-buttons').children().last().click()
        .get('button').last().click()
        .wait('@postData')
        .get('.order').should('have.length', 4)
        .get('.order').last().contains('h3', 'Dan')
        .get('.order').last().find('ul').children().should('have.length', 3)
        .get('.order').last().find('ul').children().first().should('have.text', 'beans')
        .get('.order').last().find('ul').children().last().should('have.text', 'carnitas')
    })
  })

  it('Should require name and at least one ingredient per order', () => {
    cy.getData().as('getData')
    cy.wait('@getData').then(() => {
      cy.get('button').last().click()
        .get('h2').should('have.text', 'Please add name and ingredients.')
        .get('.order').should('have.length', 3)
        .get('input[type="text"]').type('Dan')
        .get('button').last().click()
        .get('h2').should('have.text', 'Please add ingredients.')
        .get('.order').should('have.length', 3)
        .get('input[type="text"]').clear()
        .get('.ingredient-buttons').children().first().click()
        .get('button').last().click()
        .get('h2').should('have.text', 'Please add name.')
        .get('.order').should('have.length', 3)
    })
  })
});