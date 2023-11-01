# API de Gerenciamento de Blog

Esta é uma API de gerenciamento de blog que permite criar, editar, excluir e listar postagens, categorias e usuários. A API foi desenvolvida em Node.js e utiliza o Sequelize para interagir com um banco de dados MySQL. O projeto segue uma arquitetura em camadas, com modelos (model), serviços (service) e controladores (controller) para manter o código organizado.

## Entidades

A API possui as seguintes entidades:

- **Usuário (User):** Representa os usuários que podem fazer login e criar postagens no blog.
- **Postagem (BlogPost):** Representa as postagens do blog, incluindo título, conteúdo e informações do usuário que a criou.
- **Categoria (Category):** Representa as categorias a que as postagens podem estar associadas.
- **Relação entre Postagem e Categoria (PostCategory):** Uma tabela de associação que relaciona postagens a categorias.

## Endpoints

A API oferece os seguintes endpoints:

### Usuário (User)

- `POST /user`: Cria um novo usuário.
- `GET /user`: Obtém uma lista de todos os usuários.
- `GET /user/:id`: Obtém informações de um usuário específico.
- `DELETE /user/me`: Exclui o próprio usuário logado.

### Postagem (BlogPost)

- `POST /post`: Cria uma nova postagem no blog.
- `GET /post`: Obtém uma lista de todas as postagens do blog.
- `GET /post/:id`: Obtém informações de uma postagem específica.
- `PUT /post/:id`: Atualiza uma postagem existente.
- `DELETE /post/:id`: Exclui uma postagem.

### Categoria (Category)

- `POST /categories`: Cria uma nova categoria.
- `GET /categories`: Obtém uma lista de todas as categorias.

### Autenticação (Login)

- `POST /login`: Autentica um usuário e gera um token de acesso.

## Requisitos

Para usar a API, você precisará do seguinte:

- Node.js
- Banco de dados MySQL
- Sequelize
- Pacotes NPM instalados (veja o arquivo `package.json`)

## Instalação

1. Clone o repositório.
2. Execute `npm install` para instalar as dependências.
3. Configure as variáveis de ambiente, incluindo `JWT_SECRET` para autenticação.
4. Configure as informações do banco de dados no arquivo de configuração do Sequelize.
5. Execute as migrações do banco de dados com `npx sequelize db:migrate`.
6. Inicie o servidor com `npm start`.

## Uso

Após a instalação, você pode usar a API para criar, editar, excluir e listar postagens, categorias e usuários. Certifique-se de autenticar-se primeiro para acessar recursos protegidos.

## Contribuição

Contribuições para este projeto são bem-vindas. Você pode reportar problemas, sugerir melhorias ou enviar solicitações de pull.
