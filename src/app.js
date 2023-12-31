const express = require('express');

const { login } = require('./controllers');
const { UserControler, CategoryController, BlogPostController } = require('./controllers');
const validateJWT = require('./middlewares/validateJWT');
const validateCategorieIds = require('./middlewares/validateCategorieIds');
const {
  validatePostCredentials,
  validatePostCredentialsToUpdate,
} = require('./middlewares/validatePostCredentials');
const validateQuerySearch = require('./middlewares/validateQuerySearch');
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
app.delete('/user/me', validateJWT, UserControler.deleteUser);
app.post(
  '/post',
  validateJWT,
  validatePostCredentials,
  validateCategorieIds,
  BlogPostController.createPost,
);
app.get(
  '/post/search',
  validateJWT,
  validateQuerySearch,
  BlogPostController.getAllBlogPostUserCategoryByQuery,
);
app.get('/post', validateJWT, BlogPostController.getAllBlogPostUserCategory);
app.get('/post/:id', validateJWT, BlogPostController.getAllBlogPostUserCategoryById);
app.put(
  '/post/:id',
  validateJWT,
  validatePostCredentialsToUpdate,
  BlogPostController.updatePost,
);
app.delete(
  '/post/:id',
  validateJWT,
  BlogPostController.deletePost,
);
app.post('/categories', validateJWT, CategoryController.createCategory);
app.get('/categories', validateJWT, CategoryController.getAllCategories);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
