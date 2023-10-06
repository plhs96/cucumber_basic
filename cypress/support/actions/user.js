const UserListPageLocator = require('../../locators/user/listPage.json')
const NewUpdatePageLocator = require('../../locators/user/newUpdate.json')
const OperationPageLocator = require('../../locators/user/operationMenu.json')
Cypress.Commands.add('clickNewUser', () =>{
    cy.clicks(UserListPageLocator.btnNew)
    
})
Cypress.Commands.add('clickEditUser', () =>{
    cy.clicks(UserListPageLocator.btnOperation,OperationPageLocator.btnEdit )
    
})
Cypress.Commands.add('deleteUser', (option) =>{
    cy.clicks(UserListPageLocator.btnOperation,OperationPageLocator.btnDelete)
    cy.cancelOrNot(option)
    
})
Cypress.Commands.add('addNewUser', (firstname, lastname, email, roles, option) =>{
    cy.types([NewUpdatePageLocator.txtFirstname, NewUpdatePageLocator.txtLastname, NewUpdatePageLocator.txtEmail], [firstname, lastname, email])
    if ((roles+'').includes('School Manager')) {
        cy.clicks(NewUpdatePageLocator.btnSchoolManager)
    }
    if ((roles+'').includes('User Manager')) {
        cy.clicks(NewUpdatePageLocator.btnUserManager)
    }
    if ((roles+'').includes('Course Manager')) {
        cy.clicks(NewUpdatePageLocator.btnCourseManager)
    }
    if ((roles+'').includes('Teacher')) {
        cy.clicks(NewUpdatePageLocator.btnTeacher)
    }
    cy.cancelOrNot(option)
})

Cypress.Commands.add('searchUser', (valueSearch)=>{
    cy.types([UserListPageLocator.txtSearchValue], [valueSearch])
})