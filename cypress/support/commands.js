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

Cypress.Commands.add('postNewUser', (user) => {
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
      failOnStatusCode: false,
      method: 'POST',
      url: '/login',
      body: {
        "email": user.email,
        "password": user.password,
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      user.authToken = response.body.authorization;
    })
})
