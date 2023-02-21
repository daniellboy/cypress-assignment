const Form_URL = '/#sign-in'

describe('Search and Favorite Team', () => {
  before(() => {
    cy.visit(Form_URL)

    cy.url()
      .should('eq', Cypress.config().baseUrl + Form_URL)
  })

  it('Assert ZUJU KICKOFF title', () => {
    cy.get('.MuiTypography-h2')
      .should('contain', 'Welcome to ZUJU KICKOFF')
      
  })
  
  it('Search Team and add to Favorites', () => {
    cy.get('input[name="email"]').type('zujutest+automation@gmail.com')
    cy.get('input[name="password"]').type('TestAuto123')
    cy.get('button').contains('Log In').click();
    cy.get('h4').contains('Teams', { timeout: 10000 }).should('be.visible')
    cy.get('h4').contains('Teams').click();
    cy.get('input[type="search"]', { timeout: 10000 }).should('be.visible')
    cy.get('input[type="search"]').type('Manchester City')
    cy.get('img[alt="Manchester City"]', { timeout: 10000 }).should('be.visible')
    cy.get('img[alt="Manchester City"]').parent().parent().prev().click();
    cy.get('div[data-cy="fav-team-list"]>div>div>div>span>img[alt="Manchester City"]', { timeout: 10000 }).should('be.visible')
  })

  it('Remove Team from Favorite Team', () => {
    cy.get('h4').contains('Teams', { timeout: 10000 }).should('be.visible')
    cy.get('h4').contains('Teams').click();
    cy.get('div[data-cy="fav-team-list"]>div>div>div>span>img[alt="Manchester City"]', { timeout: 10000 }).should('be.visible')
    cy.get('img[alt="Manchester City"]').parent().parent().prev().eq(0).click();
    cy.get('div[data-cy="fav-team-list"]>div>div>div>span>img[alt="Manchester City"]', { timeout: 10000 }).should('not.be.visible')
  })

  it('Search team which is not exists', () => {
    cy.get('h4').contains('Teams', { timeout: 10000 }).should('be.visible')
    cy.get('h4').contains('Teams').click();
    cy.get('input[type="search"]').clear().type('Nankatsu')
    cy.get('p[data-cy="teams-not-found"]', { timeout: 10000 }).should('be.visible')

  })
})
