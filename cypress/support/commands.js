import Ajv from "ajv"
const ajv = new Ajv()

Cypress.Commands.add('contractTest', (method, url, schema, body) => {

    cy.api({
        url: url,
        method: method
    }).then((response) => {
        cy.fixture(schema).then((reportSchema) => {
            const validate = ajv.compile(reportSchema)
            const valid = validate(response.body)

            if (!valid) {
                cy.log(validate.errors).then(() => {
                    console.log(validate.errors)
                    throw new Error(`Contract Error: ${validate.errors[0].instancePath} - ${validate.errors[0].message} `)
                })
            } else {
                cy.log('Contract Test is valid!')
            }

        })
    })
})

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
      user.authToken = response.body.authorization;
    })
})

Cypress.Commands.add('customApiRequest', (method, url, authToken = null, body = null) => {
  const headers = authToken ? { Authorization: `${authToken}` } : {};

  return cy.request({
    method,
    url,
    headers,
    body,
    failOnStatusCode: false,
  });
});