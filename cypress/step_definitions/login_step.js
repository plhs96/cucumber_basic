import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
require('../support/actions/authen')
Given('Goto Login Page', () => {
    cy.visit('/')
})

When('I log in as Following', (datatable) => {
    datatable.hashes().forEach(element => {
        cy.login(element.email, element.password)
    });
})

Then('Verify expected {string}', (messge) => {
    if (messge!= "success") {
        cy.contains(messge)
    } else {
        cy.url().should('include', 'new_session=true')
    }
})