
class ProdutosRequest {
  listarProdutos() {
    return cy.customApiRequest('GET', '/produtos');
  }

  cadastrarProduto(authToken, produto) {
    return cy.customApiRequest('POST', '/produtos', authToken, produto).then((res) => {
      Cypress.env('productId', res.body._id);
      return res;
    });
  }

  buscarProdutoPorId(id, authToken) {
    return cy.customApiRequest('GET', `/produtos/${id}`, authToken);
  }

  editarProduto(id, authToken, produto) {
    return cy.customApiRequest('PUT', `/produtos/${id}`, authToken, produto);
  }

  excluirProduto(id, authToken) {
    return cy.customApiRequest('DELETE', `/produtos/${id}`, authToken);
  }
}

export default ProdutosRequest;
