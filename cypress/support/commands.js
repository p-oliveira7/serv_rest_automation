Cypress.Commands.add('postUser', (user) => {
    cy.api({
        failOnStatusCode: false,
        method: 'POST',
        url: '/usuarios',
        body: {
          "nome": user.postName,
          "email": user.email,
          "password": "teste",
          "administrador": "true"
        }
      })
})