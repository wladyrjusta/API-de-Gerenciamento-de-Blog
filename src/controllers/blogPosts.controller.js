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

const updatePost = async (req, res) => {
  const token = req.header('Authorization');
  const { id } = req.params;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.id !== Number(id)) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    await BlogPostService.updatePost(req.body, id);

    const updatedPost = await BlogPostService.getAllBlogPostUserCategoryById(id);
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deletePost = async (req, res) => {
  const token = req.header('Authorization');
  const { id } = req.params;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const post = await BlogPostService.getAllBlogPostUserCategoryById(id);

    if (post.message) {
      return res.status(404).json(post);
    }

    if (decoded.id !== post.userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
  
    await BlogPostService.deletePost(id);
    return res.status(204).send();   
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

const getAllBlogPostUserCategoryById = async (req, res) => {
  const { id } = req.params;
  const blogpostUserCategory = await BlogPostService.getAllBlogPostUserCategoryById(id);

  if (blogpostUserCategory.message) {
    return res.status(404).json(blogpostUserCategory);
  }

  return res.status(200).json(blogpostUserCategory);
};

const getAllBlogPostUserCategoryByQuery = async (req, res) => {
  const { q } = req.query;

  const blogpostUserCategoryTitle = await BlogPostService.getAllBlogPostByQueryTitle(q);
  const blogpostUserCategoryContent = await BlogPostService.getAllBlogPostByQueryContent(q);
  if (blogpostUserCategoryTitle.type === null && blogpostUserCategoryContent.type === null) {
    return res.status(200).json([]); 
  }
  if (blogpostUserCategoryTitle.length > 0) return res.status(200).json(blogpostUserCategoryTitle);
  if (blogpostUserCategoryContent.length > 0) {
    return res.status(200).json(blogpostUserCategoryContent);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllBlogPostUserCategory,
  getAllBlogPostUserCategoryById,
  getAllBlogPostUserCategoryByQuery,
};
