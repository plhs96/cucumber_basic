import {Before, After, Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"

Before(()=>{
    cy.reload()
})
After(() =>{
    cy.reload()
})

Given("precondition", () => {
    cy.visit("https://demo.guru99.com/test/newtours")
})

When("action", () => {
    cy.title().should('eq', 'Welcome: Mercury Tours')
})

When("testable outcome", () => {
    cy.title().should('eq', 'Welcome: Mercury Tours')
})

Given("open newtours application", () => {
    cy.visit("https://demo.guru99.com/test/newtours")
})

When("provide valid userName and password", () => {
    cy.get('[name=userName]').type('Mercury')
    cy.get('[name=password]').type('Mercury')
})

Then("click on submit button", () => {
    cy.get('[name=submit]').click()
})

And("verify title of the web page", () => {
    cy.title().should('eq', 'Login: Mercury Tours')
})

Given("open newtours application", () => {
    cy.visit("https://demo.guru99.com/test/newtours")
})

When("provide valid {string} and {string}", (userName, password) => {
    cy.get('[name=userName]').type(userName)
    cy.get('[name=password]').type(password)
})

Then("click on submit button", () => {
    cy.get('[name=submit]').click()
})

And("verify title should be {string}", (title) => {
    cy.title().should('eq', title)
})

Given("open newtours application", () => {
    cy.visit("https://demo.guru99.com/test/newtours")
})

When("I log in as Following", (datatable) => {
    datatable.hashes().forEach(element => {
        cy.get('[name=userName]').type(element.userName)
        cy.get('[name=password]').type(element.password)
    })
})

Then("click on submit button", () => {
    cy.get('[name=submit]').click()
})

And("verify title should be {string}", (title) => {
    cy.title().should('eq', title)
})