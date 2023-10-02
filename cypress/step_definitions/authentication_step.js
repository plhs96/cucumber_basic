import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
require('../support/actions/authen')

Given('The login page in {string} site is opened successfull', (env) => {
    switch ((env + '').trim().toLocaleLowerCase()) {
        case 'primary-domain':
            cy.visit(Cypress.env("primaryDomainLink"))
            break;
        case 'sub-domain':
            cy.visit(Cypress.env("subDomainLink"))
            break;
    }
})

When('Login with email: {string}, domain:{string} and password: {string}', (email, domain, password) => {
    cy.login(email, password, domain)
})

Then('Verify url home page', () => {
    cy.url().should('include', 'new_session=true')
})

Then('the message {string} should be displayed', (message) => {
    cy.contains(message)
})
And('Logout', ()=>{
    cy.logout()
    cy.reload()
    cy.url().should('include', 'login')
})