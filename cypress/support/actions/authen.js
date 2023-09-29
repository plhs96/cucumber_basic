const LocatorLogin = require('../../locators/login.json')
const LocatorForgot = require('../../locators/forgot.json')
const LocatorResetPassword = require('../../locators/setpassword.json')


Cypress.Commands.add('login', (email, password, domain) => {
    cy.url().then(url => {
        if ((url + '').includes('signin')) {
            cy.types([LocatorLogin.txtEmail], [email])
            cy.clicks(LocatorLogin.btnNext)
            if (domain != "") {
                cy.clicks("//*[text()='" + domain + "']")
                cy.types([LocatorLogin.txtPassword], [password])
                cy.clicks(LocatorLogin.btnSignIn)
            }
            else if (password != "") {
                cy.types([LocatorLogin.txtPassword], [password])
                cy.clicks(LocatorLogin.btnSignIn)
            }
        }
        else {
            cy.types([LocatorLogin.txtEmail, LocatorLogin.txtPassword], [email, password])
            cy.clicks(LocatorLogin.btnSignIn)
        }
    })
})

Cypress.Commands.add('clickLinkForgot', () => {
    cy.clicks(LocatorLogin.lnkForgot)
})

Cypress.Commands.add('clickBackToSignIn', () => {
    cy.clicks(LocatorForgot.btnBackToSignIn)
})

Cypress.Commands.add('forgotPassword', (email, domain) => {
    cy.url().then(url => {
        if ((url + '').includes('signin')) {
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
        } else {
            cy.types([LocatorForgot.txtEmail], [email])
            cy.clicks(LocatorForgot.btnGetResetLink)
        }
    })
})

Cypress.Commands.add('setPassword', (newPassword, confirmPassword) => {
    cy.types([LocatorResetPassword.txtNew, LocatorResetPassword.txtConfirm], [newPassword, confirmPassword])
    cy.clicks(LocatorResetPassword.btnReset)
})