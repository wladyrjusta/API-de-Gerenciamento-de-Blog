const { PostCategory } = require('../models');

const insertPostCategory = async (categoriesId, postId) => {
  const insertions = categoriesId.map((categoryId) => ({ postId, categoryId }));
  await PostCategory.bulkCreate(insertions);
};

module.exports = {
  insertPostCategory,
};
