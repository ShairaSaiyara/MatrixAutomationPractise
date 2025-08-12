///<reference types="cypress"/>


describe('Automation Test Suite for Forgot Password Functionality', () => {
  
  beforeEach(() => {
    cy.visit('https://capitolqa.matrixqa.com/logon')
  })

  it('redirects to Forgot password page', () => {
    cy.visit('https://capitolqa.matrixqa.com/logon')
    cy.get('.monarch-blue').click()
    cy.url().should('include', 'https://capitolqa.matrixqa.com/Authentication/RequestPasswordReset')
  })

  it('clicking Cancel redirects back to the Login page', () => {
    cy.get('.monarch-blue').click()
    cy.get('.monarch-request-a-password-cancel').click()
    cy.url().should('include', 'https://capitolqa.matrixqa.com/logon')
  })

  it('submitting form without email gives error', () => {
    cy.get('.monarch-blue').click()
    cy.get('.ui-button-text').click()
    cy.get('.validation-summary-errors').should('contain', 'The Email field is required.')
  })

  it('submitting form with invalid email gives error', () => {
    cy.get('.monarch-blue').click()
    cy.get('#Email').type('oishi@gmail.com')
    cy.get('.ui-button-text').click()
    cy.get('.validation-summary-errors').should('contain', 'The email address that you have entered is invalid. Please verify that you are entering the correct email address. Please contact Customer Support if you need further assistance. 1.877.687.9066')
  })

  it('submitting form with valid email', () => {
    cy.get('.monarch-blue').click()
    cy.get('#Email').type('shaira.islam@enosisbd.com')
    cy.get('.ui-button-text').click()
    cy.url().should('include', 'https://capitolqa.matrixqa.com/logon')
    cy.get('#message').should('contain', 'A confirmation email was sent to the address provided. This email will contain a link that will enable you to change your password.')
  })

  //practising with .expect() instead of .should():
  it('submitting form with valid email', () => {
  cy.get('.monarch-blue').click();
  cy.get('#Email').type('shaira.islam@enosisbd.com');
  cy.get('.ui-button-text').click();

  cy.url().then((url) => {
    expect(url).to.include('https://capitolqa.matrixqa.com/logon');
  });

  cy.get('#message').then(($msg) => {
    expect($msg.text()).to.contain(
      'A confirmation email was sent to the address provided. This email will contain a link that will enable you to change your password.'
    );
  });
});

})