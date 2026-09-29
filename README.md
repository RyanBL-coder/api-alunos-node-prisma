# API de Alunos

API REST desenvolvida durante a disciplina **Programação para Frameworks Web**, utilizando Node.js, Express, Prisma e MySQL.

O projeto tem como objetivo aplicar conceitos de desenvolvimento de APIs REST, incluindo operações de CRUD, validação de dados, paginação, ordenação, tratamento de erros e persistência de dados utilizando o Prisma ORM.

---

## 🚀 Tecnologias utilizadas

- **Node.js**
- **Express**
- **Prisma ORM**
- **MySQL**
- **Zod**
- **Nodemon**
- **JavaScript (CommonJS)**

### Principais dependências

- `express` — criação da API e gerenciamento das rotas.
- `@prisma/client` — comunicação com o banco de dados através do Prisma.
- `@prisma/adapter-mariadb` — adapter utilizado na conexão com o banco.
- `zod` — validação dos dados recebidos pela API.
- `dotenv` — carregamento das variáveis de ambiente.
- `nodemon` — reinicialização automática do servidor durante o desenvolvimento.

---

## 📋 Funcionalidades

A API possui as seguintes funcionalidades:

- Cadastro de alunos.
- Consulta de alunos com paginação.
- Ordenação dos alunos por diferentes campos.
- Consulta de um aluno pelo ID.
- Atualização de dados de um aluno.
- Remoção de um aluno.
- Validação dos dados recebidos.
- Tratamento de alunos inexistentes.
- Tratamento de emails duplicados.
- Contagem total de alunos cadastrados.

---

## 📁 Estrutura do projeto

A aplicação está organizada separando responsabilidades entre rotas, controllers, services, middlewares, schemas e tratamento de erros.

```text
src/
├── controllers/
│   └── AlunoController.js
│
├── databases/
│   └── prisma.js
│
├── errors/
│   ├── ApiError.js
│   ├── AlunoInvalidoError.js
│   ├── AlunoNaoEncontradoError.js
│   ├── EmailDuplicadoError.js
│   └── PaginacaoInvalidaError.js
│
├── middlewares/
│   ├── validarAluno.js
│   └── validarAlunoUpdate.js
│
├── routes/
│   └── alunoRoutes.js
│
├── schemas/
│   ├── alunoSchema.js
│   └── alunoUpdateSchema.js
│
├── services/
│   └── AlunoService.js
│
└── index.js

prisma/
└── schema.prisma

package.json
```

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- MySQL
- npm

Também é necessário possuir um banco de dados MySQL configurado para a aplicação.

---

## 📥 Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd NOME_DO_PROJETO
```

Instale as dependências:

```bash
npm install
```

Depois, gere o Prisma Client:

```bash
npx prisma generate
```

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

Exemplo:

```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/NOME_DO_BANCO"

DB_HOST=localhost
DB_USER=USUARIO
DB_PASSWORD=SENHA
DB_NAME=NOME_DO_BANCO

PORT=3000
```

### Banco de dados

As variáveis relacionadas ao banco devem corresponder à configuração do MySQL utilizado:

- `DATABASE_URL` — URL de conexão utilizada pelo Prisma.
- `DB_HOST` — endereço do servidor MySQL.
- `DB_USER` — usuário do banco.
- `DB_PASSWORD` — senha do banco.
- `DB_NAME` — nome do banco de dados.

### Servidor

- `PORT` — porta utilizada pelo servidor Express.

> ⚠️ **Importante:** não envie o arquivo `.env` para o GitHub. As credenciais do banco de dados devem permanecer privadas.

---

## 🗄️ Banco de dados

O projeto utiliza **Prisma ORM** para comunicação com o banco MySQL.

O modelo `Aluno` possui os seguintes campos:

```text
Aluno
├── id
├── nome
├── email
├── createdAt
└── updatedAt
```

O campo `email` possui restrição de unicidade, impedindo que dois alunos sejam cadastrados com o mesmo endereço de email.

Após configurar o banco de dados, gere o Prisma Client:

```bash
npx prisma generate
```

---

## ▶️ Executando o projeto

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O script utiliza o Nodemon para reiniciar automaticamente a aplicação quando houver alterações nos arquivos.

A API estará disponível, por padrão, em:

```text
http://localhost:3000
```

---

# 📚 Endpoints da API

A API utiliza `/alunos` como rota base.

## GET `/alunos`

Retorna uma lista de alunos com paginação, ordenação e contagem total.

### Parâmetros de paginação

- `page` — número da página.
- `pageSize` — quantidade de alunos por página.

### Parâmetros de ordenação

- `orderBy` — campo utilizado para ordenar os resultados.
- `order` — direção da ordenação: `asc` ou `desc`.

### Exemplo

```http
GET /alunos?page=1&pageSize=10&orderBy=nome&order=asc
```

### Valores padrão

Caso os parâmetros não sejam informados:

```text
page = 1
pageSize = 10
orderBy = id
order = asc
```

### Campos disponíveis para ordenação

- `id`
- `nome`
- `email`
- `createdAt`
- `updatedAt`

### Resposta

```json
{
  "alunos": [
    {
      "id": 1,
      "nome": "Ana Paula",
      "email": "ana@email.com",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "total": 42
}
```

O campo `total` representa a quantidade total de alunos cadastrados no banco, independentemente da quantidade de registros retornados na página atual.

---

## GET `/alunos/:id`

Retorna um aluno específico pelo seu ID.

### Exemplo

```http
GET /alunos/1
```

### Resposta de sucesso

**Status:** `200 OK`

```json
{
  "aluno": {
    "id": 1,
    "nome": "Ana Paula",
    "email": "ana@email.com",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Aluno não encontrado

**Status:** `404 Not Found`

```json
{
  "error": "Aluno não encontrado"
}
```

---

## POST `/alunos`

Cadastra um novo aluno.

### Corpo da requisição

```json
{
  "nome": "Ana Paula",
  "email": "ana@email.com"
}
```

### Resposta de sucesso

**Status:** `201 Created`

```json
{
  "aluno": {
    "id": 1,
    "nome": "Ana Paula",
    "email": "ana@email.com",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

Os dados enviados são validados antes de serem enviados ao Service.

### Validações

- `nome` deve possuir pelo menos 3 caracteres.
- `email` deve possuir formato válido.

---

## PUT `/alunos/:id`

Atualiza os dados de um aluno existente.

É possível alterar:

- `nome`;
- `email`;
- ou ambos.

### Exemplo — alterar nome

```http
PUT /alunos/1
```

```json
{
  "nome": "Novo Nome"
}
```

### Exemplo — alterar email

```json
{
  "email": "novo@email.com"
}
```

### Exemplo — alterar ambos

```json
{
  "nome": "Novo Nome",
  "email": "novo@email.com"
}
```

### Resposta de sucesso

**Status:** `200 OK`

A resposta contém o aluno atualizado.

### Possíveis erros

**Aluno inexistente:**

```text
404 Not Found
```

```json
{
  "error": "Aluno não encontrado"
}
```

**Dados inválidos:**

```text
400 Bad Request
```

**Email já cadastrado:**

```text
409 Conflict
```

```json
{
  "error": "E-mail já cadastrado"
}
```

---

## DELETE `/alunos/:id`

Remove um aluno pelo ID.

### Exemplo

```http
DELETE /alunos/1
```

### Resposta de sucesso

**Status:** `204 No Content`

A resposta não possui conteúdo no corpo.

### Aluno não encontrado

**Status:** `404 Not Found`

```json
{
  "error": "Aluno não encontrado"
}
```

---

# 🛡️ Tratamento de erros

A aplicação utiliza uma classe base `ApiError` para representar erros controlados pela API.

A partir dela são utilizadas exceções específicas, como:

- `AlunoInvalidoError`
- `AlunoNaoEncontradoError`
- `EmailDuplicadoError`
- `PaginacaoInvalidaError`

O **Service** é responsável por identificar o problema e lançar a exceção (`throw`).

O **Controller** é responsável por capturar a exceção (`catch`) e determinar a resposta HTTP enviada ao cliente.

---

## 🔄 Fluxo da aplicação

A aplicação segue uma separação de responsabilidades entre as principais camadas:

```text
Requisição HTTP
       │
       ▼
    Routes
       │
       ▼
   Controller
       │
       ▼
     Service
       │
       ▼
     Prisma
       │
       ▼
     MySQL
```

Os middlewares e schemas são utilizados para validar os dados antes que eles sejam processados pelo Service.

---

## 🧪 Testando a API

As requisições podem ser realizadas utilizando ferramentas como:

- Thunder Client
- Postman
- Insomnia

Exemplos:

```http
GET    http://localhost:3000/alunos
GET    http://localhost:3000/alunos/1
POST   http://localhost:3000/alunos
PUT    http://localhost:3000/alunos/1
DELETE http://localhost:3000/alunos/1
```

Exemplo de ordenação:

```http
GET http://localhost:3000/alunos?orderBy=nome&order=asc
```

Exemplo de paginação com ordenação:

```http
GET http://localhost:3000/alunos?page=2&pageSize=5&orderBy=email&order=desc
```

---

## 🎓 Informações acadêmicas

**Disciplina:** Programação para Frameworks Web

**Professor:** Thiago Rodrigues

**Projeto:** API de Alunos

---

## 👨‍💻 Desenvolvimento

Projeto desenvolvido como parte das atividades práticas da disciplina, aplicando conceitos de desenvolvimento de APIs REST com Node.js, Express, Prisma, MySQL e validação de dados.