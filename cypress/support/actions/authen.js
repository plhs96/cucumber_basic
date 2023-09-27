const LocatorLogin = require('../../locators/login.json')
const LocatorForgot = require('../../locators/forgot.json')
const LocatorResetPassword = require('../../locators/setpassword.json')
Cypress.Commands.add('loginSubDomain', (email, password) => {
    cy.types([LocatorLogin.txtEmail, LocatorLogin.txtPassword], [email, password])
    cy.clicks(LocatorLogin.btnSignIn)
})
Cypress.Commands.add('loginPrimaryDomain', (email, domain, password) => {
    cy.types([LocatorLogin.txtEmail], [email])
    cy.clicks(LocatorLogin.btnNext)
    cy.log(domain)
    if (domain != "") {
        cy.clicks("//*[text()='" + domain + "']")
        cy.types([LocatorLogin.txtPassword], [password])
        cy.clicks(LocatorLogin.btnSignIn)
    }
    if (password != "") {
        cy.types([LocatorLogin.txtPassword], [password])
        cy.clicks(LocatorLogin.btnSignIn)
    }
})

Cypress.Commands.add('clickLinkForgot', () => {
    cy.clicks(LocatorLogin.lnkForgot)
})

Cypress.Commands.add('clickBackToSignIn', () => {
    cy.clicks(LocatorForgot.btnBackToSignIn)
})
Cypress.Commands.add('forgotPasswordInSubdomain', (email) => {
    cy.types([LocatorForgot.txtEmail], [email])
    cy.clicks(LocatorForgot.btnGetResetLink)
})
Cypress.Commands.add('forgotPasswordInPrimarydomain', (email, domain) => {
    cy.types([LocatorForgot.txtEmail], [email])
    cy.clicks(LocatorForgot.btnNext)
    cy.wait(3000)
    cy.url().then(url => {
        if (url.includes('?email=')) {
            cy.log('choose domain')
            if (domain != '') {
                cy.clicks("//*[text()='" + domain + "']")
                cy.wait(3000)
            }

            cy.url().then((url) => {
                if (url.includes('subdomain=')) {
                    cy.clicks(LocatorForgot.btnGetResetLink)
                }

            })
        }
        else {
            cy.url().then(url => {
                if (url.includes('subdomain=')) {
                    cy.clicks(LocatorForgot.btnGetResetLink)
                }
            })
            cy.log('not choose domain')

        }
    })
})

Cypress.Commands.add('resetPassword', (newPassword, confirmPassword) =>{
    cy.types([LocatorResetPassword.txtNew, LocatorResetPassword.txtConfirm], [newPassword, confirmPassword])
    cy.clicks(LocatorResetPassword.btnReset)
})