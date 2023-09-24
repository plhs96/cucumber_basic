const LocatorLogin = require('../../locators/login.json')
Cypress.Commands.add('loginSubDomain', (email, password) =>{
    cy.types([LocatorLogin.txtEmail, LocatorLogin.txtPassword], [email, password])
    cy.clicks(LocatorLogin.btnSignIn)
})
Cypress.Commands.add('loginPrimaryDomain', (email, domain, password) =>{
    cy.types([LocatorLogin.txtEmail], [email])
    cy.clicks(LocatorLogin.btnNext)
    cy.log(domain)
    if(domain!="") {
        cy.clicks("//*[text()='"+domain+"']")
        cy.types([LocatorLogin.txtPassword], [password])
        cy.clicks(LocatorLogin.btnSignIn)
    }
    if (password!="") {
        cy.types([LocatorLogin.txtPassword], [password])
        cy.clicks(LocatorLogin.btnSignIn)
    }

})