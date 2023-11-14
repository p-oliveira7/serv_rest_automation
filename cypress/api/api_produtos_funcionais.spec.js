import Product from '../fixtures/product.js';
import User from '../fixtures/user.js';
import ProdutosRequest from '../requests/produtos.request.js';
const request = new ProdutosRequest;
const produtosFixture = Product;

const adminUser = User.createRandomUser(true);
const normalUser = User.createRandomUser(false);

let newProduct;
let putProduct;

describe('Testes Funcionais - Produtos', () => {

    before(() => {
        cy.createNewUser(adminUser);
        cy.login(adminUser);
      });

    it('POST - Deve validar mensagem de Produto com nome duplicado', () => {
      newProduct = produtosFixture.createRandomProduct();
        
        request.cadastrarProduto(Cypress.env('authToken'), newProduct).then((res) => {
          expect(res.status).to.eql(201);
          expect(res.body.message).to.be.eql('Cadastro realizado com sucesso');
        });
  
        request.cadastrarProduto(Cypress.env('authToken'), newProduct).then((res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.be.eql('Já existe produto com esse nome');
        });
    });
  
    it('POST - Deve validar mensagem de token de acesso ausente', () => {
        request.cadastrarProduto('', newProduct).then((res) => {
          expect(res.status).to.eql(401);
          expect(res.body.message).to.be.eql('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
        });
    });
  
    it('GET - Deve validar mensagem de produto não encontrado', () => {
      request.buscarProdutoPorId('111111', Cypress.env('authToken')).then((res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.be.equal('Produto não encontrado');
      });
    });
    it('DELETE - Deve validar mensagem de nenhum registro excluído', () => {
      request.excluirProduto('111111', Cypress.env('authToken')).then((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.be.eql('Nenhum registro excluído');
      });
    });
    it('DELETE - Deve validar mensagem de token de acesso ausente', () => {
        request.excluirProduto(Cypress.env('productId'), '').then((res) => {
          expect(res.status).to.eql(401);
          expect(res.body.message).to.be.eql('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
        });
    });
    it('PUT - Deve validar mensagem de Produto com nome duplicado', () => {  
        request.editarProduto(Cypress.env('productId'), Cypress.env('authToken'), newProduct).then((res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.be.eql('Já existe produto com esse nome');
        });
    });
    it('PUT - Deve validar mensagem de Produto com nome duplicado', () => {  
      request.editarProduto(Cypress.env('productId'), '', newProduct).then((res) => {
        expect(res.status).to.eql(401);
        expect(res.body.message).to.be.eql('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
      });
    });
  });
  
    describe('Teste Funcionais - Produtos - Usuário não autorizado', () => {
      before(() => {
        cy.createNewUser(normalUser);
        cy.login(normalUser);
      });
  
    it('POST - Não deve permitir o cadastro de produto quando o usuario não é administrador', () => {
      newProduct = produtosFixture.createRandomProduct();
        request.cadastrarProduto(Cypress.env('authToken'), newProduct).then((res) => {
          expect(res.status).to.eql(403);
          expect(res.body.message).to.be.eql('Rota exclusiva para administradores');
        });
    });
    it('DELETE - Não deve permitir a exclusão de produto quando o usuario não é administrador', () => {
      request.excluirProduto(Cypress.env('productId'), Cypress.env('authToken')).then((res) => {
        expect(res.status).to.eql(403);
        expect(res.body.message).to.be.eql('Rota exclusiva para administradores');
      });
    });
    it('PUT - Não deve permitir a edição de produto quando o usuario não é administrador', () => {
      putProduct = produtosFixture.createRandomProduct();
      
      request.editarProduto(Cypress.env('productId'), Cypress.env('authToken'), putProduct).then((res) => {
        expect(res.status).to.eql(403);
        expect(res.body.message).to.be.eql('Rota exclusiva para administradores');
      });
    });
  });