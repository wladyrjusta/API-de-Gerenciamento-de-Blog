const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const { UsersService } = require('../services');

const createUser = async (req, res) => {
    const newUser = await UsersService.createUser(req.body);

    if (newUser.message) return res.status(400).send(newUser);

    if (newUser.errorMessage) return res.status(409).json({ message: newUser.errorMessage });

    const payload = {
      email: newUser.email,
      adm: false,
    };
      
    const token = jwt.sign(payload, JWT_SECRET);
      
    return res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const users = await UsersService.getAllUsers();

  if (users.message) {
    return res.status(404).json(users);
  }

  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const users = await UsersService.getUserById(id);

  if (users.message) {
    return res.status(404).json({ message: users.message });
  }

  return res.status(200).json(users);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
