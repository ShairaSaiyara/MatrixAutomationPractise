///<reference types="cypress"/>

describe('Automation Test Suite for Login Functionality', () => {
  beforeEach(() => {
    cy.visit('https://capitolqa.matrixqa.com/logon')
  })

  it('logs in with valid credentials', () => {
    cy.get('#Email').type('mmcapitol@example.com')
    cy.get('#Password').type('M@tr1x2022')
    cy.get('.ui-button-text').click()
    cy.url().should('include', 'https://capitolqa.matrixqa.com/monarch/#/')
  })

  it('cannot log in with invalid credentials', () => {
    cy.get('#Email').type('mmcapitol@gmail.com')
    cy.get('#Password').type('M@tr1x2030')
    cy.get('.ui-button-text').click()
    cy.get('li').should('contain', 'Email address or password is not valid')
  })

  it('cannot log in without password', () => {
    cy.get('#Email').type('mmcapitol@gmail.com')
    cy.get('.ui-button-text').click()
    cy.get('li').should('contain', 'The Password field is required.')
  })

  it('cannot log in without email', () => {
    cy.get('#Password').type('M@tr1x2022')
    cy.get('.ui-button-text').click()
    cy.get('li').should('contain', 'The Email field is required.')
  })

  it('cannot log in without email & password', () => {
    cy.get('.ui-button-text').click()
    cy.get('ul > :nth-child(1)').should('contain', `The Email field is required.`)
    cy.get('ul > :nth-child(2)').should('contain', 'The Password field is required.')
  })
  
})

