<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" /></a>
</p>

<h1 align="center">🧑‍🌾 Produtores API</h1>

<p align="center">
  API RESTful construída com <a href="https://nestjs.com/" target="_blank">NestJS</a>, <a href="https://typeorm.io/" target="_blank">TypeORM</a> e <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> para gerenciamento de produtores rurais, fazendas e culturas agrícolas.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@nestjs/core"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/@nestjs/core"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="License" /></a>
  <a href="https://www.npmjs.com/package/@nestjs/common"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="Downloads" /></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social" alt="Follow Nest" /></a>
</p>

---

## 📦 Funcionalidades

- Cadastro, edição e exclusão de **produtores rurais**.
- Validação automática de **CPF** e **CNPJ**.
- Controle de áreas:
  - A soma das áreas agricultável e de vegetação **não pode exceder** a área total da fazenda.
- Registro de **múltiplas culturas** por fazenda.
- Relacionamento:
  - Um produtor pode ter várias fazendas.
  - Uma fazenda pode ter várias culturas por safra.

### 📊 Dashboard

- Total de fazendas cadastradas.
- Total de hectares registrados.
- Gráficos de pizza por:
  - Estado.
  - Cultura plantada.
  - Uso do solo (agricultável e vegetação).

---

## 🚀 Executando o Projeto Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v20+
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

### Instalação

```bash
yarn install
```

### Subir com Docker
```bash
docker compose up --build
```
A aplicação será acessível em:
- API: http://localhost:3000
- Documentação Swagger: http://localhost:3000/api
- Documentação técnica (Compodoc): http://localhost:8080

##  Rodando Testes
```bash
# Testes unitários
yarn test

# Testes de integração
yarn test:e2e

# Cobertura
yarn test:cov
```

