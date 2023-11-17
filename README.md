# Teste de API com Cypress e Mochawesome

Este projeto tem como objetivo realizar testes na API REST gratuita Serverest. Certifique-se de que a API está acessível e disponível durante a execução dos testes. A documentação da mesma pode ser encontrada em [https://serverest.dev/](https://serverest.dev/).

## Ferramentas Utilizadas - Testes de API

| Ferramenta | Descrição | Versão |
|------------|-----------|--------|
| [@bahmutov/cy-api](https://www.npmjs.com/package/@bahmutov/cy-api) | Facilita os testes de API com Cypress | ![@bahmutov/cy-api Version](https://img.shields.io/badge/@bahmutov/cy-api-v2.2.6-brightgreen) |
| [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter) | Geração de relatórios para testes Cypress | ![cypress-mochawesome-reporter Version](https://img.shields.io/badge/cypress--mochawesome--reporter-v3.6.0-brightgreen) |
| [cypress-multi-reporters](https://www.npmjs.com/package/cypress-multi-reporters) | Geração de relatórios múltiplos | ![cypress-multi-reporters Version](https://img.shields.io/badge/cypress--multi--reporters-v1.6.3-brightgreen) |
| [ajv](https://www.npmjs.com/package/ajv) | Validador de dados JSON | ![ajv Version](https://img.shields.io/badge/ajv-v8.12.0-brightgreen) |
| [dotenv](https://www.npmjs.com/package/dotenv) | Carregamento de variáveis de ambiente | ![dotenv Version](https://img.shields.io/badge/dotenv-v16.3.1-brightgreen) |
| [faker-br](https://www.npmjs.com/package/faker-br) | Geração de dados falsos | ![faker-br Version](https://img.shields.io/badge/faker--br-v0.4.1-brightgreen) |
| [mochawesome](https://www.npmjs.com/package/mochawesome) | Geração de relatórios para testes Mocha | ![mochawesome Version](https://img.shields.io/badge/mochawesome-v7.1.3-brightgreen) |
| [mochawesome-merge](https://www.npmjs.com/package/mochawesome-merge) | Mescla relatórios Mochawesome | ![mochawesome-merge Version](https://img.shields.io/badge/mochawesome--merge-v4.3.0-brightgreen) |
| [mochawesome-report-generator](https://www.npmjs.com/package/mochawesome-report-generator) | Geração de relatórios HTML para Mochawesome | ![mochawesome-report-generator Version](https://img.shields.io/badge/mochawesome--report--generator-v6.2.0-brightgreen) |

## Tutorial: Configurando e Executando Testes

### Pré-requisitos
1. [VSCode](https://code.visualstudio.com/)
2. [Node.js](https://nodejs.org/)

## Configuração

### Clonar o Repositório
```bash
git clone https://github.com/p-oliveira7/serv_rest_automation.git
cd serv_rest_automation
```
### Instalar Dependências
```bash
npm i
```
# Scripts
### Executar os Testes
- Abra o Cypress (modo interativo):
```bash
npx cypress open
```
### Executar os testes em modo headless e gerar o relatório:

```bash
npx cypress run
```
### Gerar Relatório

```bash
npm run report:merge
npm run report:generate
```

## Estrutura de Diretórios

O projeto segue uma estrutura organizada de pastas para facilitar a manutenção e compreensão dos diferentes componentes. Aqui está uma visão geral da estrutura de diretórios:

- **cypress/api**
  - **specs**

  - **smoke-test**
    - `api_produtos.spec.js`: Especificações de teste de fumaça para produtos.

  - **funcionais**
    - `api_produtos_funcionais.spec.js`: Especificações de teste funcional para produtos.
      
  - **contrato**
    - `api_produtos_contrato.spec.js`: Especificações de teste de contrato.

- **cypress/fixtures**
  - Arquivos de massa de dados utilizados nos testes.

- **cypress/utils**
  - `productUtils.js`: Classe com método para gerar dados de produto usando Faker.
  - `userUtils.js`: Classe com método para gerar dados de usuário usando Faker.

- **cypress/support/commands.js**
  - Comandos personalizados Cypress, incluindo `contractTest`, `createNewUser`, `login`, e `customApiRequest`.

- **cypress/requests**
  - `produtos.request.js`: Classe com métodos para interações com a API relacionados a produtos.

## Relatório de Testes

O relatório de testes está configurado para ser gerado automaticamente pelo GitHub Actions e publicado no GitHub Pages. Para visualizar os relatórios, acesse a seguinte URL:

[Relatório de Testes](https://p-oliveira7.github.io/serv_rest_automation/)
