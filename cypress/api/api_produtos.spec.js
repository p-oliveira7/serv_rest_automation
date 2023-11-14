import Product from '../fixtures/product.js';
import User from '../fixtures/user.js';
import ProdutosRequest from '../requests/produtos.request.js';
const request = new ProdutosRequest;
const produtosFixture = Product;

const adminUser = User.createRandomUser(true);
const normalUser = User.createRandomUser(false);

let newProduct;
let putProduct;
describe('CRUD - PRODUTOS - smokeTest', () => {
    before(() => {
      cy.createNewUser(adminUser);
      cy.login(adminUser);
    });
  
    it('Deve listar os produtos cadastrados GET', () => {
      request.listarProdutos().then((res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.be.not.null;
      });
    });
  
    it('Deve cadastrar um produto POST', () => {
      newProduct = produtosFixture.createRandomProduct();
      
      request.cadastrarProduto(Cypress.env('authToken'), newProduct).then((res) => {
        expect(res.status).to.eql(201);
        expect(res.body.message).to.be.eql('Cadastro realizado com sucesso');
        expect(res.body).to.have.property('_id');
      });
    });

    it('Deve buscar o produto pelo ID GET', () => {
      request.buscarProdutoPorId(Cypress.env('productId'), Cypress.env('authToken')).then((res) => {
        newProduct._id = Cypress.env('productId');
        expect(res.status).to.eql(200);
        expect(res.body).deep.equal(newProduct);
      });
    });

    it('Deve Editar o produto pelo ID PUT', () => {
      putProduct = produtosFixture.createRandomProduct();
      
      request.editarProduto(Cypress.env('productId'), Cypress.env('authToken'), putProduct).then((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.be.eql('Registro alterado com sucesso');
      });
    });

    it('Deve excluir o produto pelo ID DELETE', () => {
      request.excluirProduto(Cypress.env('productId'), Cypress.env('authToken')).then((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.be.eql('Registro excluído com sucesso');
      });
    });
});