import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
require('../support/actions/authen')
Given('The login page is opened successfull', () => {
    cy.visit('/')
})

When('user input email {string} and password {string}', (email, password) => {
        cy.login(email, password)
})

Then('Verify url home page', () => {
        cy.url().should('include', 'new_session=true')
})
Then('the message {string} should be displayed', (message) =>{
    cy.contains(message)
})