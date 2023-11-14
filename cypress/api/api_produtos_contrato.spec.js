
describe('Teste de Contrato - GET /produtos', () => {
  it('Deve validar o contrato da resposta', () => {
    cy.contractTest('GET', '/produtos', 'productListSchema.json')
  });
});