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

Cypress.Commands.add('createNewUser',  (user) => {
  cy.api({
      failOnStatusCode: false,
      method: 'POST',
      url: '/usuarios',
      body: {
        "nome": user.nome,
        "email": user.email,
        "password": user.password,
        "administrador": user.administrador
      }
    })
})

Cypress.Commands.add('login', (user) => {
  cy.api({
      method: 'POST',
      url: '/login',
      body: {
        "email": user.email,
        "password": user.password,
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      Cypress.env('authToken', response.body.authorization)
    })
})
