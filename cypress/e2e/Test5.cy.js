///<reference types="cypress"/>

describe('Activities List Page Tests', () => {
  
  beforeEach(() => {
    cy.visit('https://capitolqa.matrixqa.com/logon')
    cy.get('#Email').type('mmcapitol@example.com')
    cy.get('#Password').type('M@tr1x2022')
    cy.get('.ui-button-text').click()
  })

  it('accessing the activities list page', () => {
    cy.get('.lists > :nth-child(2) > a').click()
    cy.url().should('include', 'https://capitolqa.matrixqa.com/monarch/#/activities')
  })

  // it('navigating to an activity profile from the list page', () => {
  //   cy.get('.lists > :nth-child(2) > a').click()
  //   cy.get(':nth-child(2) > .col-activity > .activities-subject > .ng-binding').click()
  //   cy.url().should('include', 'https://capitolqa.matrixqa.com/monarch/#/activity/94873857')
  // })
  
  it('showing list of completed activities', () => {
    cy.get('.lists > :nth-child(2) > a').click()
    cy.get('[ng-class="{ selected: ctrl.isCompleted }"]').click()
  })

  it('showing list of incompleted activities', () => {
    cy.get('.lists > :nth-child(2) > a').click()
    cy.get('[ng-class="{ selected: !ctrl.isCompleted }"]').click()
  })

  it('navigating to calendar tab', () => {
    cy.get('.lists > :nth-child(2) > a').click()
    cy.get('.active > .nav-link > .ng-binding').click()
  
  })

  it('opening the Types dropdown', () => {
    
    cy.get('.lists > :nth-child(2) > a').click()
    cy.get('[filter-name="TYPES"] > .dropdown > .btn-default').click()
    // cy.get('[filter-name="TYPES"]').within(() => {
    // cy.get('.btn-default').click()
  // })  
  })

  it('all checkboxes are deselected when "None" is clicked in the Types dropdown', () => {

    cy.get('.lists > :nth-child(2) > a').click()
    cy.get('[filter-name="TYPES"] > .dropdown > .btn-default').click()
    cy.get('[filter-name="TYPES"]')
      .find('button')
      .contains('None')
      .click()

    // Assert that all checkboxes in the dropdown are unchecked
    cy.get(
      '[filter-name="TYPES"] > .dropdown > .dropdown-menu > div.ng-isolate-scope > .ivh-treeview > [ng-repeat="child in root | ivhTreeviewAsArray"][style=""] > .ivh-treeview-node-content > .ivh-treeview-checkbox-wrapper > .ng-isolate-scope > .ivh-treeview-checkbox'
    ).each(($el) => {
      cy.wrap($el).should('not.be.checked')
    })
})


  it('no activities are displayed when None is selected in the Types dropdown', () => {

    cy.get('.lists > :nth-child(2) > a').click()    
    cy.get('[filter-name="TYPES"] > .dropdown > .btn-default').click()
    cy.get('[filter-name="TYPES"]')
      .find('button')
      .contains('None')
      .click()
    cy.get('.panel-body').should('contain', 'No activities found')
    })

  it('all checkboxes are selected when "All" is clicked in the Types dropdown', () => {

    cy.get('.lists > :nth-child(2) > a').click()
    cy.get('[filter-name="TYPES"] > .dropdown > .btn-default').click()
    cy.get('[filter-name="TYPES"]')
      .find('button')
      .contains('None')
      .click()

    // Assert that all checkboxes in the dropdown are unchecked
    cy.get(
      '[filter-name="TYPES"] > .dropdown > .dropdown-menu > div.ng-isolate-scope > .ivh-treeview > [ng-repeat="child in root | ivhTreeviewAsArray"][style=""] > .ivh-treeview-node-content > .ivh-treeview-checkbox-wrapper > .ng-isolate-scope > .ivh-treeview-checkbox'
    ).each(($el) => {
      cy.wrap($el).should('be.checked')
    })
})

  // cy.get('[filter-name="TYPES"] > .dropdown > .dropdown-menu > div.ng-isolate-scope > .ivh-treeview > [ng-repeat="child in root | ivhTreeviewAsArray"][style=""] > .ivh-treeview-node-content > .ivh-treeview-checkbox-wrapper > .ng-isolate-scope > .ivh-treeview-checkbox')
  // cy.get('[filter-name="TYPES"] > .dropdown > .dropdown-menu > div.ng-isolate-scope > .ivh-treeview > :nth-child(2) > .ivh-treeview-node-content > .ivh-treeview-checkbox-wrapper > .ng-isolate-scope > .ivh-treeview-checkbox')
  // cy.get('[filter-name="TYPES"] > .dropdown > .dropdown-menu > div.ng-isolate-scope > .ivh-treeview > :nth-child(3) > .ivh-treeview-node-content > .ivh-treeview-checkbox-wrapper > .ng-isolate-scope > .ivh-treeview-checkbox')
  // cy.get('div.ng-isolate-scope > .ivh-treeview > :nth-child(18) > .ivh-treeview-node-content > .ivh-treeview-checkbox-wrapper > .ng-isolate-scope > .ivh-treeview-checkbox')

})