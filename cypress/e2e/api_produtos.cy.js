import User from '../fixtures/user.js';
import Product from '../fixtures/product.js';
const faker = require('faker-br');

const adminUser = User.createRandomUser(true);
const normalUser = User.createRandomUser(false);
let newProduct;
let putProduct;
describe('CRUD - PRODUTOS', () => {
    before(() => {
        cy.postNewUser(adminUser);
        cy.login(adminUser);
    });

    it('Deve listar os produtos cadastrados GET', () => {
        cy.api({
          method: 'GET',
          url: '/produtos'
        }).then((res) => {
          expect(res.status).to.eql(200);
          expect(res.body).to.be.not.null; 
        });
      })

      it('Deve cadastrar um produto POST ', () => {

        newProduct = Product.createRandomProduct();
        cy.api({
            method: 'POST',
            url: '/produtos',
            headers: {
                Authorization: `${adminUser.authToken}`,
            },
            body: {
                "nome": newProduct.nome,
                "preco": newProduct.preco,
                "descricao": newProduct.descricao,
                "quantidade": newProduct.quantidade
            },
          }).then((res) => {
            expect(res.status).to.eql(201);
            expect(res.body.message).to.be.eql('Cadastro realizado com sucesso');
            newProduct._id = res.body._id;
          });
        })

    it('Deve buscar o produto pelo ID GET', () => {
        cy.api({
            method: 'GET',
            url: `/produtos/${newProduct._id}`,
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.body).deep.equal(newProduct);
        });
    });
    
    it('Deve Editar o produto pelo ID PUT', () => {
        putProduct = Product.createRandomProduct();
        cy.api({
            method: 'PUT',
            url: `/produtos/${newProduct._id}`,
            headers: {
                Authorization: `${adminUser.authToken}`,
            },
            body: {
                "nome": putProduct.nome,
                "preco": putProduct.preco,
                "descricao": putProduct.descricao,
                "quantidade": putProduct.quantidade
            },
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.body.message).to.be.eql('Registro alterado com sucesso');
        });
    });
    
    it('Deve excluir o produto pelo ID DELETE', () => {
        putProduct = Product.createRandomProduct();
        cy.api({
            method: 'DELETE',
            url: `/produtos/${newProduct._id}`,
            headers: {
                Authorization: `${adminUser.authToken}`,
            },
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.body.message).to.be.eql('Registro excluído com sucesso');
        });
    });
});
