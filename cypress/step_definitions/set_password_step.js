import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
require('../support/actions/authen')
require('../support/actions/mail')

Given('The forgot password page in {string} site is opened successfull', (env) => {
    switch ((env + '').trim().toLocaleLowerCase()) {
        case 'primary-domain':
            cy.visit(Cypress.env("primaryDomainLink"))
            break;
        case 'sub-domain':
            cy.visit(Cypress.env("subDomainLink"))
            break;
    }
    cy.clickLinkForgot()
})
When('Click on Back to Sign in button', () => {
    cy.clickBackToSignIn()
})
When('Input email {string} and choose domain {string}', (email, domain) => {
    cy.forgotPassword(email, domain)
})
Then('Verify Url Login', () => {
    cy.url().should('include', '/login')
})
Then('There is a message with content: {string}', (message) => {
    cy.contains(message)
})
And('Verify login with email {string}, old password {string} and domain {string} when message {string} is successfull before set password', (email, oldPassword, domain, message) => {
    if ((message + '').includes(email) && email != "") {
        cy.clickBackToSignIn()
        cy.login(email, oldPassword, domain)
        cy.url().should('not.include', '/login')
    }
})
And('Check eamil {string} and set password when message {string} is successfull', ( email, message, datatable) => {
    
    if ((message + '').includes('We have sent you a link to reset your password')) {
        cy.checkMail(email)
         cy.iframe('#ifmail').xpath("//img[@alt='Ella Logo']").should('have.length', 1)
         cy.iframe('#ifmail').xpath("//*[contains(text(),'received a request to reset your password')]").should('have.length', 1)
        cy.forwardToLink()
        const data = datatable.hashes()
        data.forEach(element => {
            const {newPassword, confirmPassword, message} = element
           cy.resetPassword(newPassword, confirmPassword)
            if (message != '') {
                cy.checkExist(message)
            }
        });
    }
})
And('Verify login with email {string}, old password {string}, new password {string} and domain {string} when message {string} is successfull before set password', (email, oldPassword, newPassword, domain, message) => {
    if ((message + '').includes(email) && email != "") {
        cy.clickBackToSignIn()
        cy.login(email, oldPassword, domain)
        cy.checkExist('')
        cy.login(email, newPassword, domain)
        cy.url().should('not.include', '/login')
    }
})
And('Verify login with email {string}, old password {string}, new password {string} and domain {string} when message {string} is successfull after set password',(email, oldPassword, newPassword, domain, message) =>{
    if ((message + '').includes(email) && email != "") {
        cy.clickBackToSignIn()
        cy.login(email, oldPassword, domain)
        cy.checkExist('The email address or password is incorrect. Please try again.')
        cy.login(email, newPassword, domain)
        cy.url().should('not.include', '/login')
    }
})