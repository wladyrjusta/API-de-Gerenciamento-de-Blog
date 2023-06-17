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

module.exports = {
  createUser,
};
