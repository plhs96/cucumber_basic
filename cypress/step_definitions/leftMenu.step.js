import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
require('../support/actions/leftMenu')
And('Goto User Tab', () =>{
    cy.gotoTabUser()
})
Given('Reload Page', () =>{
    cy.reload()
})