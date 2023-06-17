const { CategoryService } = require('../services');

const createCategory = async (req, res) => {
  const newCategory = await CategoryService.createCategory(req.body);

  if (newCategory.message) return res.status(400).send(newCategory);

  return res.status(201).json(newCategory);
};

const getAllCategories = async (_req, res) => {
  const categories = await CategoryService.getAllCategories();

  if (categories.message) {
    return res.status(404).json(categories);
  }

  return res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};
