import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
const auto_prefix = Date.now()
const MailLocator = require('../locators/mail.json')
require('../support/actions/user')
require('../support/actions/mail')
require('cypress-iframe')
And('Click add new user', () => {
    cy.clickNewUser()
})
Given('Search user by: {string}', (email) => {
        if (email == "") {
            email = "email" + auto_prefix + "@yopmail.com"
        }
        cy.searchUser(email)
})
When('Invite-Edit user with firstname: {string}, lastname: {string}, email: {string}, role: {string} and option: {string}', (firstname, lastname, email, role, option) => {
    cy.addNewUser(firstname, lastname, email, role, option)
})
Then('Verrify error message: {string} is display', (message) => {
    cy.checkExist(message)
})

And('Verify search result', () =>{
    cy.checkExist('No results matched.')
})

Then('Verrify email: {string} is display with option: {string}', (email, option) =>{
    if ((option+'').trim().toLocaleLowerCase()=='cancel') {
        cy.checkExist('No results matched.')
    } else {
        cy.checkNoExist('No results matched.')
        cy.checkMail(email)
        cy.iframe(MailLocator.ifMail).xpath('//*[text()="You have been invited to join Ella"]').should('have.length', 1)
    }
})
Then('Verrify email: {string}, lastname: {string} and email: {string} is display with option: {string}', (firstname, lastname, email, option) =>{
    if ((option+'').trim().toLocaleLowerCase()=='cancel') {
        cy.checkNoExist(firstname, lastname, email)
    } else {
        cy.checkExist('No results matched.')
        cy.checkMail(email)
        cy.iframe(MailLocator.ifMail).xpath('//*[text()="You have been invited to join Ella"]').should('have.length', 1)
    }
})

And('Click edit user', () =>{
    cy.clickEditUser()
})
And('Click delete user with option: {string}', (option) =>{
    cy.deleteUser(option)
})
