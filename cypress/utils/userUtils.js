const faker = require('faker-br');

class User {
  constructor(nome, email, password, administrador, authToken) {
    this.nome = nome;
    this.email = email;
    this.password = password;
    this.administrador = administrador;
    this.authToken = authToken;
  }

  static createRandomUser(administrador = false) {
    return new User(
      `${faker.name.firstName()} ${faker.name.lastName()}`,
      faker.internet.email(),
      faker.internet.password(),
      administrador ? 'true' : 'false'
    );
  }
}

export default User;