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
When('Input email {string}', (email) => {
    cy.forgotPasswordInSubdomain(email)
})
When('Input email {string} and choose domain: {string}', (email, domain) => {
    cy.forgotPasswordInPrimarydomain(email, domain)
})
Then('Verify Url Login', () => {
    cy.url().should('include', '/login')
})
Then('There is a message with content: {string}', (message) => {
    cy.contains(message)
})
And('Verify login with email {string} and old password {string} in Sub-domain when message {string} is successfull and check email', (email, oldPassword, message) => {
    if ((message + '').includes(email) && email != "") {
        cy.clickBackToSignIn()
        cy.loginSubDomain(email, oldPassword)
        cy.checkMail(email)
        cy.iframe('#ifmail').xpath("//img[@alt='Ella Logo']").should('have.length', 1)
        cy.iframe('#ifmail').xpath("//*[contains(text(),'received a request to reset your password')]").should('have.length', 1)
    }
})
And('Verify login with email {string}, old password {string} and domain {string} in Primary-domain when message {string} is successfull and check email', (email, oldPassword, domain, message) => {
    if ((message + '').includes(email) && email != "") {
        cy.clickBackToSignIn()
        cy.loginPrimaryDomain(email, domain, oldPassword)
        cy.checkMail(email)
        cy.iframe('#ifmail').xpath("//img[@alt='Ella Logo']").should('have.length', 1)
        cy.iframe('#ifmail').xpath("//*[contains(text(),'received a request to reset your password')]").should('have.length', 1)
    }
})
And('Set password in mail {string} when message {string} is successfull', (email, message, datatable) => {
    cy.log(message)
    if ((message + '').includes('We have sent you a link to reset your password')) {
        cy.checkMail(email)
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

