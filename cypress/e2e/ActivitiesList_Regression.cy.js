///<reference types="cypress"/>

describe('Activities List Page Tests', () => {
  
  beforeEach(() => {
    cy.visit('https://capitolqa.matrixqa.com/logon')
    cy.get('#Email').type('mmcapitol@example.com')
    cy.get('#Password').type('M@tr1x2022')
    cy.get('.ui-button-text').click()
    cy.get('.lists > :nth-child(2) > a').click()
  })

  it('ACT_001_accessing the activities list page', () => {
    //checking if the url of the current page is that of Activities list page
    cy.url().should('include', 'https://capitolqa.matrixqa.com/monarch/#/activities')
    //also check some element in the page
  })
  
  it('ACT_002_users can toggle between Complete and Incomplete', () => {
    //clicking on Complete button
    cy.get('[ng-class="{ selected: ctrl.isCompleted }"]').click()
    //clicking on Incomplete button
    cy.get('[ng-class="{ selected: !ctrl.isCompleted }"]').click()
    //should contain 'selected' class
  })

  it.only('ACT_004_user can filter activities by Types', () => {
    cy.wait(5000)
    cy.get('[filter-name="TYPES"] > .dropdown > .btn-default').click()

    cy.get('[filter-name="TYPES"]')
      .find('button')
      .contains('None')
      .click()

    // cy.get('[filter-name="TYPES"] > .dropdown > .dropdown-menu > div.ng-isolate-scope > .ivh-treeview > :nth-child(2) > .ivh-treeview-node-content > .ivh-treeview-checkbox-wrapper > .ng-isolate-scope > .ivh-treeview-checkbox')
    //   .click()

    cy.get('.ivh-treeview .ivh-treeview-node-leaf span.ivh-treeview-node-label').contains('ACTIVE ACCOUNT - NEEDS ANALYSIS MEETING').click()

    cy.get('div.ng-isolate-scope > .ivh-treeview > :nth-child(2) > .ivh-treeview-node-content > .ivh-treeview-node-label')
      .invoke('text')
      .then((typeWithMethod) => {
        const fullText = typeWithMethod.trim()
        const typeOnly = fullText.split('(')[0].trim()
        cy.wait(5000)  
        cy.get('[style=""] > .col-activity > .activities-subject > .ng-binding').click()

        // Wait for the method type dropdown to appear and ensure it's not empty
        cy.get('select-method-type.ng-isolate-scope > .dropdown > .triggerer > ng-transclude')
          .should('exist')
          .should('be.visible')
          .invoke('text')
          .should('not.be.empty')
          .then((activityPageType) => {
              expect(activityPageType.trim()).to.include(typeOnly)
            })    
      })
    })
  
  it('ACT_005_user can filter activities by Salesperson', () => {
    //Selecting All in the Types dropdown since previously only one type was selected
    cy.get('[filter-name="TYPES"] > .dropdown > .btn-default').click()
    cy.get('[filter-name="TYPES"]')
      .find('button')
      .contains('All')
      .click()
    //Opening the Salespeople dropdown
    cy.get('[filter-name="SALESPEOPLE"] > .dropdown > .btn-default').click()

    // Selecting "None" in the Salespeople dropdown in order to select only one salesperson
    cy.get('[filter-name="SALESPEOPLE"]')
      .find('button')
      .contains('None')
      .click()

    // Selecting a specific salesperson
    cy.get('[title="*Capitol B"] > :nth-child(3)').click()
    cy.get('[title="*Capitol B"] > :nth-child(4) > :nth-child(1) > :nth-child(5) .ivh-treeview-checkbox')
      .click()

    // Getting the name of the selected salesperson
    cy.get('[title="*Capitol B"] > :nth-child(4) > :nth-child(1) > :nth-child(5) .ivh-treeview-node-label')
      .invoke('text')
      .then((salespersonName) => {
        // Comparing each value in the Salespeople column to the selected Salesperson
        cy.get('tbody .col-salesperson').each(($el) => {
          cy.wrap($el).invoke('text').then((text) => {
            expect(text.trim()).to.equal(salespersonName.trim())
          })
        })
      })
  })

  it('ACT_008_clicking on activity name redirects to activity profile', () => {
    cy.get(':nth-child(2) > .col-activity > .activities-subject > .ng-binding').click()
    cy.url().should('include', 'https://capitolqa.matrixqa.com/monarch/#/activity/94873856')
  })

  it('ACT_009_clicking on salesperson name redirects to salesperson profile', () => {
    cy.get(':nth-child(2) > .col-salesperson > div > .ng-binding').click()
    cy.url().should('include', 'https://capitolqa.matrixqa.com/monarch/#/manager/scorecard/520?name=Matrix,%20Manager')
  })

  // it('ACT_010_clicking on contact name redirects to contact profile', () => {
  //   cy.get(':nth-child(2) > .col-contact > div > .ng-binding').click()
  //   cy.url().should('include', 'https://capitolqa.matrixqa.com/monarch/#/manager/scorecard/520?name=Matrix,%20Manager')
  // })

  it('ACT_010_user can open contact profile by clicking contact name', () => {
  // Select all visible, non-empty contact cells
  cy.get('.col-contact')
    .filter(':visible') // checking if it's visible
    .each(($el, index, $list) => {
      const text = $el.text().trim()

      if (text.length > 0) {
        // Found the first non-empty contact
        cy.wrap($el).click()

        // Now assert URL or profile info to confirm redirection
        cy.url().should('include', 'https://capitolqa.matrixqa.com/monarch/#/contact/') // or whatever your contact profile URL looks like
        cy.get('#page-title') // replace with actual selector
          .should('contain', text)

        // Exit loop after first valid click
        return false
      }
    })
})


})