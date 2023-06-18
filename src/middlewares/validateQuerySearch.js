const { BlogPostService } = require('../services');

module.exports = async (req, res, next) => {
  const { q } = req.query;

  if (!q) {
    const listOfBlogpostUserCategory = await BlogPostService.getAllBlogPostUserCategory();
    return res.status(200).json(listOfBlogpostUserCategory);
  }

  return next();
};
