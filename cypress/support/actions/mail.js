require('cypress-iframe')
const MailLocator = require('../../locators/mail.json')
Cypress.Commands.add('checkMail', (mail) => {
      cy.log("==================="+ mail)
      cy.visit('https://yopmail.com/')
      cy.xpath(MailLocator.txtEmail).focus().clear().type(mail).blur()
      cy.xpath(MailLocator.btnGo).click()
      cy.iframe('#ifinbox').xpath(MailLocator.txtMailItem).eq(0).click()
})

Cypress.Commands.add('forwardToLink', () => {
      cy.iframe(MailLocator.ifMail).xpath(MailLocator.btn).should('have.attr', 'href').then(href => {
            let url = new URL(href);
            let tabula
            if ((href + '').includes('https://jxvrh961.r.us-west-2.awstrack.me/L0/')) {
                  tabula = decodeURIComponent(url.pathname.split('/')[2])
            }
            else {
                  tabula = decodeURIComponent(url.href)
            }
            cy.visit(tabula)
      })
})