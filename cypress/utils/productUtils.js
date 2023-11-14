const faker = require('faker-br');

class Product {
  constructor(nome, preco, descricao, quantidade) {
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
    this.quantidade = quantidade;
  }

  static createRandomProduct() {
    return new Product(
      faker.commerce.productName() + faker.random.number({ min: 1, max: 999999,}),
      faker.random.number({ min: 1, max: 1000, precision: 2 }),
      faker.lorem.words(),
      faker.random.number({ min: 1, max: 100 })
    );
  }
}
export default Product;
