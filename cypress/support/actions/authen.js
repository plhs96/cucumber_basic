const LocatorLogin = require('../../locators/login.json')
const LocatorForgot = require('../../locators/forgot.json')
const LocatorsetPassword = require('../../locators/setpassword.json')
const LocatorHeader = require('../../locators/header.json')
const LocatorProfileMenu = require('../../locators/profileMenu.json')
const LocatorMyProfile = require('../../locators/myProfile.json')

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
    cy.types([LocatorsetPassword.txtNew, LocatorsetPassword.txtConfirm], [newPassword, confirmPassword])
    cy.clicks(LocatorsetPassword.btnReset)
})
Cypress.Commands.add('changePassword', (currentPassword, newPassword, confirmPassword) => {
    cy.types([LocatorsetPassword.txtCurent, LocatorsetPassword.txtNew, LocatorsetPassword.txtConfirm], [currentPassword, newPassword, confirmPassword])
    cy.clicks(LocatorsetPassword.btnReset)
})
Cypress.Commands.add('gotoMyPassword', () => {
    cy.clicks(LocatorHeader.btnProfile, LocatorProfileMenu.btnMyProfile, LocatorMyProfile.tbPassword)
})
Cypress.Commands.add('logout', () => {
    cy.clicks(LocatorHeader.btnProfile, LocatorProfileMenu.btnLogout)
})