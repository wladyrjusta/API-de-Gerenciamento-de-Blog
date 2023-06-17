const Joi = require('joi');

const validateCategoryName = (category) =>
  Joi.object({
    name: Joi.string().required().messages({
      'string.required': '"name" is required',
    }),
  }).validate(category);

module.exports = {
  validateCategoryName,
};
