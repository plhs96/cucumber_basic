const LocatorLogin = require('../../locators/login.json')
Cypress.Commands.add('login', (email, password) =>{
    cy.types([LocatorLogin.txtEmail, LocatorLogin.txtPassword], [email, password])
    cy.clicks(LocatorLogin.btnSignIn)
})