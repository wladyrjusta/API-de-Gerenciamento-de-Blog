const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const { BlogPostService, PostCategoryService } = require('../services');

const createPost = async (req, res) => {
  const token = req.header('Authorization');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const newPost = await BlogPostService.createPost({ ...req.body, userId: decoded.id });
    await PostCategoryService
      .insertPostCategory(req.body.categoryIds, newPost.id);
  
    return res.status(201).json({
      id: newPost.id,
      title: newPost.title,
      content: newPost.content,
      userId: decoded.id,
      updated: newPost.updated,
      published: newPost.published,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllBlogPostUserCategory = async (_req, res) => {
  const listOfBlogpostUserCategory = await BlogPostService.getAllBlogPostUserCategory();

  if (listOfBlogpostUserCategory.message) {
    return res.status(404).json(listOfBlogpostUserCategory);
  }

  return res.status(200).json(listOfBlogpostUserCategory);
};

module.exports = {
  createPost,
  getAllBlogPostUserCategory,
};
