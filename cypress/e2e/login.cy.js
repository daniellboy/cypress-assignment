const Form_URL = '/#sign-in'

describe('Login Scenario', () => {
  before(() => {
    cy.visit(Form_URL)

    cy.url()
      .should('eq', Cypress.config().baseUrl + Form_URL)
  })

  it('Assert ZUJU KICKOFF title', () => {
    cy.get('.MuiTypography-h2')
      .should('contain', 'Welcome to ZUJU KICKOFF')
      
  })

  it('Try Login with empty email and password', () => {
    cy.get('button').contains('Log In').click();
    cy.get('.Mui-error', { timeout: 5000 }).contains('Email is required!').should('be.visible')
    cy.get('.Mui-error', { timeout: 5000 }).contains('Password is required!').should('be.visible')
  })

  it('Try Login with wrong email and password', () => {
    cy.get('input[name="email"]').type('unknown@address.com')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button').contains('Log In').click();
    cy.get('p').contains('The email or password you entered is incorrect. Please try again.', { timeout: 5000 }).should('be.visible')
  })

  it('Try Login with wrong password', () => {
    cy.get('input[name="email"]').clear().type(Cypress.config().loginEmail)
    cy.get('input[name="password"]').clear().type('TestAuto123456')
    cy.get('button').contains('Log In').click();
    cy.get('p').contains('The email or password you entered is incorrect. Please try again.', { timeout: 5000 }).should('be.visible')
  })

  it('Click on Show Password button before login', () => {
    cy.get('input[name="email"]').clear().type(Cypress.config().loginEmail)
    cy.get('input[name="password"]').clear().type(Cypress.config().loginPassword)
    cy.get('button[aria-label="toggle password visibility"]').click();
    cy.get('input[name="password"]').should('have.value', 'TestAuto123')
  })

  it('Forgot Password?', () => {
    cy.get('a').contains('Forgot password?').should('be.visible')
    cy.get('a').contains('Forgot password?').click();
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="email"]').clear().type('unknown@abcdfg.com')
    cy.get('button').contains('Send me a link').click();
    cy.get('h6')
      .contains('A password reset link will be sent to your email address if it is registered on our platform', { timeout: 5000 })
      .should('be.visible')
    cy.get('button').contains('Resend link').should('be.visible')
    cy.get('a').contains('Back to Login').should('be.visible').click()


  })
  
  it('Login to Zuju app', () => {
    cy.get('svg[data-testid="GoogleIcon"]').next('p').contains('Continue with Google', { timeout: 10000 }).should('be.visible')
    cy.get('svg[data-testid="FacebookIcon"]').next('p').contains('Continue with Facebook', { timeout: 10000 }).should('be.visible')
    cy.get('svg[data-testid="AppleIcon"]').next('p').contains('Continue with Apple').scrollIntoView()
    cy.get('svg[data-testid="AppleIcon"]').next('p').contains('Continue with Apple', { timeout: 10000 }).should('be.visible')
    cy.get('svg[data-testid="DiscordIcon"]').next('p').contains('Continue with Discord', { timeout: 10000 }).should('be.visible')
    cy.get('input[name="email"]').clear().type(Cypress.config().loginEmail)
    cy.get('input[name="password"]').clear().type(Cypress.config().loginPassword)
    cy.get('button').contains('Log In').click();
    cy.get('h2[data-cy="page-heading"]', { timeout: 10000 }).contains('Upcoming for you').should('be.visible')
  })

})
