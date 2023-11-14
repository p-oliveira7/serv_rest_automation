
class ProdutosRequest {
    listarProdutos(authToken = null) {
      const headers = authToken ? { Authorization: `${authToken}` } : {};
  
      return cy.api({
        method: 'GET',
        url: '/produtos',
        headers,
      });
    }

    cadastrarProduto(authToken, produto) {
        return cy.api({
          method: 'POST',
          url: '/produtos',
          headers: { Authorization: `${authToken}` },
          body: produto,
          failOnStatusCode: false,
        }).then((res) => {
          Cypress.env('productId', res.body._id);
          return res;
        });
    }

    buscarProdutoPorId(id, authToken = null) {
      const headers = authToken ? { Authorization: `${authToken}` } : {};
  
      return cy.api({
        method: 'GET',
        url: `/produtos/${id}`,
        headers,
        failOnStatusCode: false,
      });
    }

    editarProduto(id, authToken, produto) {
    
      return cy.api({
        method: 'PUT',
        url: `/produtos/${id}`,
        headers: { Authorization: `${authToken}` },
        body: produto,
        failOnStatusCode: false,
      });
    }

    excluirProduto(id, authToken) {
      return cy.api({
        method: 'DELETE',
        url: `/produtos/${id}`,
        headers: { Authorization: `${authToken}` },
        failOnStatusCode: false,
      });
    }
}

export default ProdutosRequest;
