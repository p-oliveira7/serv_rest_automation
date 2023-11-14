import Product from '../utils/productUtils.js';
import User from '../utils/userUtils.js';
import ProdutosRequest from '../requests/produtos.request.js';

const request = new ProdutosRequest();
const produtosFixture = Product;

const adminUser = User.createRandomUser(true);
const normalUser = User.createRandomUser(false);

let newProduct;
let putProduct;

describe('Testes Funcionais - Produtos - Cenários Negativos', () => {

    before(() => {
        cy.createNewUser(adminUser);
        cy.login(adminUser);
        cy.createNewUser(normalUser);
        cy.login(normalUser);
    });

    context('POST', () => {
        before(() => {
            newProduct = produtosFixture.createRandomProduct();
        });

        it('Deve validar mensagem de Produto com nome duplicado', () => {
            request.cadastrarProduto(adminUser.authToken, newProduct).then((res) => {
                expect(res.status).to.eql(201);
                expect(res.body.message).to.be.eql('Cadastro realizado com sucesso');
            });

            request.cadastrarProduto(adminUser.authToken, newProduct).then((res) => {
                expect(res.status).to.eql(400);
                expect(res.body.message).to.be.eql('Já existe produto com esse nome');
            });
        });

        it('Deve validar mensagem de token de acesso ausente', () => {
            request.cadastrarProduto('', newProduct).then((res) => {
                expect(res.status).to.eql(401);
                expect(res.body.message).to.be.eql('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
            });
        });

        it('Não deve permitir o cadastro de produto quando o usuario não é administrador', () => {
            newProduct = produtosFixture.createRandomProduct();
            request.cadastrarProduto(normalUser.authToken, newProduct).then((res) => {
                expect(res.status).to.eql(403);
                expect(res.body.message).to.be.eql('Rota exclusiva para administradores');
            });
        });
    });

    context('GET', () => {
        it('Deve validar mensagem de produto não encontrado', () => {
            request.buscarProdutoPorId('111111', adminUser.authToken).then((res) => {
                expect(res.status).to.eql(400);
                expect(res.body.message).to.be.equal('Produto não encontrado');
            });
        });
    });

    context('DELETE', () => {
        before(() => {
            newProduct = produtosFixture.createRandomProduct();
        });

        it('Deve validar mensagem de nenhum registro excluído', () => {
            request.excluirProduto('111111', adminUser.authToken).then((res) => {
                expect(res.status).to.eql(200);
                expect(res.body.message).to.be.eql('Nenhum registro excluído');
            });
        });

        it('Deve validar mensagem de token de acesso ausente', () => {
            request.excluirProduto(Cypress.env('productId'), '').then((res) => {
                expect(res.status).to.eql(401);
                expect(res.body.message).to.be.eql('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
            });
        });

        it('Não deve permitir a exclusão de produto quando o usuario não é administrador', () => {
            request.excluirProduto(Cypress.env('productId'), normalUser.authToken).then((res) => {
                expect(res.status).to.eql(403);
                expect(res.body.message).to.be.eql('Rota exclusiva para administradores');
            });
        });
    });

    context('PUT', () => {
        before(() => {
            newProduct = produtosFixture.createRandomProduct();
            putProduct = produtosFixture.createRandomProduct();
            request.cadastrarProduto(adminUser.authToken, putProduct);
        });

        it('Deve validar mensagem de Produto com nome duplicado', () => {
            request.cadastrarProduto(adminUser.authToken, newProduct).then((res) => {
                expect(res.status).to.eql(201);
                expect(res.body.message).to.be.eql('Cadastro realizado com sucesso');
            });

            request.editarProduto(Cypress.env('productId'), adminUser.authToken, newProduct).then((res) => {
                expect(res.status).to.eql(400);
                expect(res.body.message).to.be.eql('Já existe produto com esse nome');
            });
        });

        it('Deve validar mensagem de token de acesso ausente', () => {  
          request.editarProduto(Cypress.env('productId'), '', newProduct).then((res) => {
            expect(res.status).to.eql(401);
            expect(res.body.message).to.be.eql('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
          });
        });

        it('Não deve permitir a edição de produto quando o usuario não é administrador', () => {
            request.editarProduto(Cypress.env('productId'), normalUser.authToken, putProduct).then((res) => {
                expect(res.status).to.eql(403);
                expect(res.body.message).to.be.eql('Rota exclusiva para administradores');
            });
        });
    });
});
