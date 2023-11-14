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


Cypress.Commands.add('login', (email, password) => {
  cy.api({
      method: 'POST',
      url: '/login',
      body: {
        "email": email,
        "password": password,
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      Cypress.env('authToken', response.body.authorization)
    })
})
