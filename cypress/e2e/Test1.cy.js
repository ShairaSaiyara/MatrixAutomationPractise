///<reference types="cypress"/>

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://capitolqa.matrixqa.com/logon')
    cy.get('#Email').type('mmcapitol@example.com')
    cy.get('#Password').type('M@tr1x2022{enter}')
    cy.get('.lists > :nth-child(2) > a').click()
  })
})