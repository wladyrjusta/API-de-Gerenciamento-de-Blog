const { Category } = require('../models');
const { validateCategoryName } = require('./validations/validateName');

const createCategory = async (category) => {
  const { error } = validateCategoryName(category);

  if (error) {
    return ({ message: error.message });
  }

  const newCategory = await Category.create(category);

  return newCategory;
};

module.exports = {
  createCategory,
};
