const { BlogPost, User, Category } = require('../models');

const createPost = async (post) => {
  const newPost = await BlogPost.create(post);

  return newPost;
};

const getAllBlogPostUserCategory = async () => {
  const listOfBlogpostUserCategory = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  if (!listOfBlogpostUserCategory || listOfBlogpostUserCategory.length === 0) {
    return ({ message: 'Nenhum post encontrado' });
  }

  return listOfBlogpostUserCategory;
};

module.exports = {
  createPost,
  getAllBlogPostUserCategory,
};
