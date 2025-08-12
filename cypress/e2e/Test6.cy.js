///<reference types="cypress"/>

describe('Activities List Page Tests', () => {
  
  beforeEach(() => {
    cy.visit('https://capitolqa.matrixqa.com/logon')
    cy.get('#Email').type('mmcapitol@example.com')
    cy.get('#Password').type('M@tr1x2022')
    cy.get('.ui-button-text').click()
    cy.get('.lists > :nth-child(2) > a').click()
  })

  it('ACT_008_clicking on the Activity name takes user to the Activity profile', () => {
  cy.get('.col-activity > .activities-subject > .ng-binding') 
    .each(($el) => {
      cy.wrap($el)
        .invoke('text')
        .then((activityName) => {
          cy.wrap($el).click()//click activity
          cy.wait(10000)
          cy.get('span[editable-text="ctrl.activity.subject"]')
            .invoke('text')
            .then((activitySubject) => {
              expect(activitySubject.trim()).to.equal(activityName.trim())
            })
          cy.go('back')// Returning to activity list

          cy.get('.col-activity > .activities-subject > .ng-binding', { timeout: 10000 }).should('exist')
        })
    })
})



})
