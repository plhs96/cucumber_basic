const MenuLocator = require('../../locators/generalBar/leftMenu.json')
Cypress.Commands.add('closeLeftMenu', () =>{
    cy.clicks(MenuLocator.btnOption)
    cy.xpath(MenuLocator.btnOption).eq(0).click({force:true})
})
Cypress.Commands.add('gotoTabUser', () => {
    cy.clicks(MenuLocator.tbUser)
    cy.closeLeftMenu()
})