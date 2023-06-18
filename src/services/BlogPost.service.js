const { BlogPost, User, Category } = require('../models');

const createPost = async (post) => {
  const newPost = await BlogPost.create(post);

  return newPost;
};

const updatePost = async (post, id) => {
  const updatedPost = await BlogPost.update(post, { where: { id } });

  return updatedPost;
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
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

const getAllBlogPostUserCategoryById = async (id) => {
  const blogpostUserCategory = await BlogPost.findOne({
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

const getAllBlogPostByQueryTitle = async (query) => {
  const blogpostUserCategoryTitle = await BlogPost.findAll({
    where: { title: query },
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

  if (blogpostUserCategoryTitle.length === 0) {
    return ({ type: null });
  }

  return blogpostUserCategoryTitle;
};

const getAllBlogPostByQueryContent = async (query) => {
  const blogpostUserCategoryContent = await BlogPost.findAll({
    where: { content: query },
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

  if (blogpostUserCategoryContent.length === 0) {
    return ({ type: null });
  }

  return blogpostUserCategoryContent;
};

module.exports = {
  createPost,
  updatePost,
  getAllBlogPostUserCategory,
  getAllBlogPostUserCategoryById,
  deletePost,
  getAllBlogPostByQueryContent,
  getAllBlogPostByQueryTitle,
};
