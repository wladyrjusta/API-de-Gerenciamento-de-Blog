const { User } = require('../models');
const { validateUser } = require('./validations/userCredentialsValidation');

const getAllUsersLoginInfos = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['displayName', 'image'] },
  });

  if (!users || users.length === 0) {
    return ({ message: 'Nenhum user cadastrado' });
  }

  return users;
};

const createUser = async (user) => {
  const { error } = validateUser(user);

  if (error) {
    return ({ message: error.message });
  }

  const users = await getAllUsersLoginInfos();

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

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  if (!users || users.length === 0) {
    return ({ message: 'Nenhum user cadastrado' });
  }

  return users;
};

const getUserById = async (id) => {
  const users = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!users || users.length === 0) {
    return ({ message: 'User does not exist' });
  }

  return users;
};

module.exports = {
  getAllUsersLoginInfos,
  createUser,
  getAllUsers,
  getUserById,
};
