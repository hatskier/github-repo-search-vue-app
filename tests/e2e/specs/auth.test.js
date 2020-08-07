describe('Redirection to auth route', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce()    
  })

  it('Visits the app root url', () => {
    cy.visit('/')
    cy.url().should('match', /auth/)
    cy.get('[data-cy=sign-in-button]').click()
  })
})
