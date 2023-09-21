Cypress.Commands.add('types', (locators = [], values = []) =>{
    let locator, value
    for (let index = 0; index < locators.length; index++) {
        locator = locators[index]
         value = values[index]
         if (value != null && (value+'').trim().length>0) {
            cy.xpath(locator).focus().clear().type(value).blur()
         }
    }
})

Cypress.Commands.add('clicks', (... locators) =>{
    locators.forEach(locator =>{
        cy.xpath(locator).scrollIntoView().click({force:true})
    })
})