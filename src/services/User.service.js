const { User } = require('../models');
const { validateUser } = require('./validations/userCredentialsValidation');

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['id', 'displayName', 'image'] },
  });

  if (!users || users.length === 0) {
    return ({ message: 'Nenhum paciente cadastrado' });
  }

  return users;
};

const createUser = async (user) => {
  const { error } = validateUser(user);

  if (error) {
    return ({ message: error.message });
  }

  const users = await getAllUsers();

  if (users.length > 0) {
    const usersEmail = users.map((usr) => usr.email);

    const userAlreadyExists = usersEmail.some((email) => email === user.email);
  
    if (userAlreadyExists) {
      return ({ errorMessage: 'User already registered' });
    }
  }

  const newUser = await User.create(user);

  return newUser;
};

module.exports = {
  getAllUsers,
  createUser,
};
