const { PostCategory } = require('../models');

const insertPostCategory = async (categoryId, postId) => {
  await PostCategory.bulkCreate([
    { postId, categoryId: categoryId[0] },
    { postId, categoryId: categoryId[1] },
  ]);
};

module.exports = {
  insertPostCategory,
};
