Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  phone: '1122334455',
  text: 'text',
}) => {
  cy.get('#firstName').type(data.firstName)
  cy.get('#lastName').type(data.lastName)
  cy.get('#email').type(data.email)
  cy.get('#phone').type(data.phone)
  cy.get('#open-text-area').type(data.text)
  cy.contains('button', 'Enviar').click()
})