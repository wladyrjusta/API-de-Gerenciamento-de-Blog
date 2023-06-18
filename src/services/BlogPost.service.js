const { BlogPost, User, Category } = require('../models');

const createPost = async (post) => {
  const newPost = await BlogPost.create(post);

  return newPost;
};

const updatePost = async (post, id) => {
  const updatedPost = await BlogPost.update(post, { where: { id } });

  return updatedPost;
};

const getAllBlogPostUserCategory = async () => {
  const listOfBlogpostUserCategory = await BlogPost.findOne({
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

const getAllBlogPostUserCategoryById = async (id) => {
  const [blogpostUserCategory] = await BlogPost.findAll({
    where: { id },
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

  if (!blogpostUserCategory) {
    return ({ message: 'Post does not exist' });
  }

  return blogpostUserCategory;
};

module.exports = {
  createPost,
  updatePost,
  getAllBlogPostUserCategory,
  getAllBlogPostUserCategoryById,
};
