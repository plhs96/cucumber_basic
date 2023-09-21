import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
const DataLogin = require('../datas/login.json')
require('../support/actions/authen')
Given('Goto Login Page', () => {
    cy.visit('/')
})

When('I log in as Following', () => {
    DataLogin.forEach((element) => {
        cy.login(element.email, element.password)
        if (element.error != null) {
            cy.contains(element.error)
        }
    })
})
Then('Verify result', ()=>{
    cy.url().should('include', 'new_session=true')
})
