Cypress.Commands.add('types', (locators = [], values = []) => {
    
    for (let index = 0; index < locators.length; index++) {
      const  locator = locators[index]
      const value = values[index]
        cy.xpath(locator).should('exist').then(() => {
            if (value != null && value != '') {
                cy.xpath(locator).focus().clear().type(value)
            }


        })
    }
})

Cypress.Commands.add('clicks', (...locators) => {
    locators.forEach(locator => {
        cy.xpath(locator).should('exist').then(() =>
            cy.xpath(locator).scrollIntoView().click({ force: true }))
    })
})

Cypress.Commands.add('checkExist', (...locators) => {
    locators.forEach(locator => {
        const element = cy.xpath("//*[normalize-space(text())='" + locator + "']")
        element.should('exist')
    });
})