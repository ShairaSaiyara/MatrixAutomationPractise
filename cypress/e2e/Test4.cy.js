///<reference types="cypress"/>

describe('template spec', () => {

  beforeEach(() => {
    cy.visit('https://capitolqa.matrixqa.com/logon')
  })

  it('home page appears first after login with .should()', () => {
    cy.get('#Email').type('mmcapitol@example.com')
    cy.get('#Password').type('M@tr1x2022{enter}')
  })

  it('home page appears after login with expect()', () => {
    cy.get('#Email').type('mmcapitol@example.com')
    cy.get('#Password').type('M@tr1x2022')
    cy.get('.ui-button-text').click()

    cy.url().then((url) => {
      expect(url).to.include('https://capitolqa.matrixqa.com/monarch/#/')
    })
  })

  it('clicking on plus btn opens Create Tab modal', () => {
    cy.get('#Email').type('mmcapitol@example.com')
    cy.get('#Password').type('M@tr1x2022')
    cy.get('.ui-button-text').click()
    cy.get('.btn-add > .mtx-add').click()
    // cy.get('body').then(($msg) => {
    //   expect($msg).to.include('.ng-scope > .add-edit-home-tab')
    // })
    cy.get('.modal').should('contain', '.ng-scope > .add-edit-home-tab')
  })
})