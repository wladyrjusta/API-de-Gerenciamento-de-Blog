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

const getAllCategories = async () => {
    const categories = await Category.findAll();
  
    if (!categories || categories.length === 0) {
      return ({ message: 'Nenhuma category cadastrado' });
    }
  
    return categories;
  };

module.exports = {
  createCategory,
  getAllCategories,
};
