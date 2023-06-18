const { BlogPost } = require('../models');

const createPost = async (post) => {
  const newPost = await BlogPost.create(post);

  return newPost;
};

module.exports = {
  createPost,
};
