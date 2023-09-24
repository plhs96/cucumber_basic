import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
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

When('Login with email: {string} and password: {string}', (email, password) => {
    cy.loginSubDomain(email, password)
})

When('Login with email: {string}, domain: {string} and password: {string}', (email, domain, password) => {
    cy.loginPrimaryDomain(email, domain, password)
})

Then('Verify url home page', () => {
    cy.url().should('include', 'new_session=true')
})

Then('the message {string} should be displayed', (message) => {
    cy.contains(message)
})