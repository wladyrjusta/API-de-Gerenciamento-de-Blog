const { User } = require('../models');

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['id', 'displayName', 'image'] },
  });

  if (!users || users.length === 0) {
    return ({ message: 'Nenhum paciente cadastrado' });
  }

  return users;
};

module.exports = {
  getAllUsers,
};
