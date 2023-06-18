const { CategoryService } = require('../services');

module.exports = async (req, res, next) => {
  const { categoryIds } = req.body;

  const categoriesIds = await CategoryService.getAllCategoriesIds(categoryIds);

  if (!categoriesIds || categoriesIds === 0) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const categoriesDoesentExist = categoriesIds !== categoryIds.length;

  if (categoriesDoesentExist) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  return next();
};