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

const getAllCategoriesIds = async (categoriesIds) => {
  const { count } = await Category.findAndCountAll({
    where: { id: categoriesIds },
    attributes: { exclude: ['name'] },
  });

  if (!count || count === 0) {
    return { message: 'one or more "categoryIds" not found' };
  }

  return count;
};

module.exports = {
  createCategory,
  getAllCategories,
  getAllCategoriesIds,
};
