<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/oviniciusoliveira/happet-backend?color=%2304D361&style=flat">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/oviniciusoliveira/happet-backend?style=flat">
  
  <a href="https://github.com/oviniciusoliveira/happet-backend/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oviniciusoliveira/happet-backend?style=flat">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=flat">

</p>

<h1 align="center">
  <a href="https://happet.netlify.app/">
      <img src="./.github/happet-backend-badge.png" />
  </a>
</h1>

## 📖 Tópicos

<p>
 👉<a href="#-sobre-o-projeto" style="text-decoration: none; "> Sobre o Projeto</a> <br/>
👉<a href="#-funcionalidades" style="text-decoration: none; "> Funcionalidades</a> <br/>
👉<a href="#-layout" style="text-decoration: none"> Layout</a> <br/>
👉<a href="#-como-executar-o-projeto" style="text-decoration: none"> Instalação e Configuração</a> <br/>
👉<a href="#-tecnologias" style="text-decoration: none"> Tecnologias Utilizadas</a> <br/>
👉<a href="#-desenvolvedor" style="text-decoration: none"> Desenvolvedor</a> <br/>
👉<a href="#-licence" style="text-decoration: none"> Licença</a>

</p>

<a name="-sobre-o-projeto"></a>

## 💻 Sobre o projeto

API utilizada no projeto Happet, responsável pelos dados dos Pet Homes, usuários e realizar a autenticação/autorização.

O projeto está publicado em: <a align="center" href="https://happet.netlify.app/">
<img alt="happet" src="https://img.shields.io/static/v1?label=Netlify&message=Happet&color=eea0ae&style=flat&logo=netlify"/>
</a>

---

<a name="-funcionalidades"></a>

## ⚙️ Funcionalidades

- [x] Back-end
  - [x] Rotas de Pet Homes
    - [x] Detalhes de um Pet Home
    - [x] Listagem de todos os Pet Homes
    - [x] Cadastro de Pet Home
    - [x] Deletar Pet Home
  - [x] Rotas de Usuário
    - [x] Detalhes de um Usuário
    - [x] Listagem de todos os Usuários
    - [x] Cadastro de Novo Usuário
    - [x] Deletar Usuário
  - [x] Rotas de Autenticação
    - [x] Envio de Email com Token para recadastrar senha
    - [x] Cadastrar nova senha
    - [x] Autenticar usuário utilizando JWT
  - [x] Criptografia de senhas utilizando bcrypt

---

<a name="-layout"></a>

## 🎨 Layout

- [Repositório da Aplicação WEB](https://github.com/oviniciusoliveira/happet-web)

---

## 🛠 Instalação e Configuração do Projeto

### Pré-requisitos

Para executar os comandos, é necessário possuir as seguintes ferramentas instaladas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e o [Docker](https://www.docker.com/).

Para manipular o código, recomendo utilizar o [VSCode](https://code.visualstudio.com/).

#### 📟 Rodando a API (Servidor)

1. Clone este repositório

   ```sh
   git clone https://github.com/oviniciusoliveira/happet-backend.git
   ```

2. Acesse a pasta do projeto no seu terminal/cmd

   ```sh
   cd backend
   ```

3. Instale as dependências

   ```sh
   npm install
   ```

4. Rode um container no docker com a imagem do PostgreSQL 
   ```sh
   docker run --name happet -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
   ```

5. Altere o nome do arquivo .env.sample para .env e configure as variáveis de ambiente

6. Execute a aplicação em modo de desenvolvimento

   ```sh
   npm run dev
   ```

7. O servidor será aberto na porta 3333 - Acesse http://localhost:3333

---

<a name="-tecnologias"></a>

## 🧱 Tecnologias Utilizadas

#### **Server** ([NodeJS](https://nodejs.org/en/) + [TypeScript](https://www.typescriptlang.org/))

<<<<<<< HEAD
#### **Backend** e **Banco de Dados** ([PostgreSQL](https://www.postgresql.org/)) hospedados no [Heroku](https://dashboard.heroku.com/)
=======
#### **Backend** e **Banco de Dados** (PostgreSQL) hospedados no [Heroku](https://dashboard.heroku.com/)
>>>>>>> 99bf1c0b9dd93dd5c7ea2b7dac8acf7bc0293903
#### **Imagens** Hospedadas na [Cloudinary](https://cloudinary.com/)

#### **Bibliotecas**

- **[bcryptjs](https://preview.npmjs.com/package/bcryptjs/v/1.0.1)**
- **[express](http://expressjs.com/pt-br/)**
- **[JSON Web Token](https://jwt.io/)**
- **[Nodemailer](https://nodemailer.com/about/)**
- **[TypeORM](https://typeorm.io/)**

> Mais informações no [package.json](https://github.com/oviniciusoliveira/happet-backend/blob/master/package.json)

#### **Ferramentas e utilitários usados durante o desenvolvimento**

- Editor: **[Visual Studio Code](https://code.visualstudio.com/)**
- Testes de API: **[Insomnia](https://insomnia.rest/)**
- Conteinerização: **[Docker](https://www.docker.com/)**
- SQL Client: **[Beekeeper](https://www.beekeeperstudio.io/)**

---

<a name="-desenvolvedor"></a>

## 🐱‍👤 **Desenvolvedor**

<p>
 <img src="https://avatars.githubusercontent.com/u/63078274?s=400&u=2022e2fd74330269752d4e1c4306bb560131a780&v=4" width="120px;" alt="Vinícius Oliveira"/>
 <br />
 <sub><strong>⭐Vinícius Oliveira⭐</strong></sub>
</p>

[![Linkedin Badge](https://img.shields.io/badge/-Linkedin-blue?style=flat&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/oviniciusoliveira/)](https://www.linkedin.com/in/oviniciusoliveira/)

---

<a name="-licence"></a>

## 📝 Licença

Este projeto esta sob a licença [MIT](./LICENSE).

Feito com 💙 por Vinícius Oliveira [👋 Entre em contato!](https://www.linkedin.com/in/oviniciusoliveira/)

---
