const express = require('express');

const { login } = require('./controllers');
const { UserControler, CategoryController, BlogPostController } = require('./controllers');
const validateJWT = require('./middlewares/validateJWT');
const validateCategorieIds = require('./middlewares/validateCategorieIds');
const { validatePostCredentials } = require('./middlewares/validatePostCredentials');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', login);
app.get('/user', validateJWT, UserControler.getAllUsers);
app.get('/user/:id', validateJWT, UserControler.getUserById);
app.post('/user', UserControler.createUser);
app.post(
  '/post',
  validateJWT,
  validatePostCredentials,
  validateCategorieIds,
  BlogPostController.createPost,
  );
app.post('/categories', validateJWT, CategoryController.createCategory);
app.get('/categories', validateJWT, CategoryController.getAllCategories);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
