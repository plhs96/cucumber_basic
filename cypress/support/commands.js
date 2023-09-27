Cypress.Commands.add('types', (locators = [], values = []) => {
    let locator, value
    for (let index = 0; index < locators.length; index++) {
        locator = locators[index]
        value = values[index]
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
        const element = cy.xpath("//*[translate(normalize-space(text()), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')='reset password'] | //*[translate(normalize-space(text()), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')='" + locator + "']")
        element.should('exist')
    });
})