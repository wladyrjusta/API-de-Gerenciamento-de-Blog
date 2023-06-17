const { CategoryService } = require('../services');

const createCategory = async (req, res) => {
  const newCategory = await CategoryService.createCategory(req.body);

  if (newCategory.message) return res.status(400).send(newCategory);

  return res.status(201).json(newCategory);
};

module.exports = {
  createCategory,
};
