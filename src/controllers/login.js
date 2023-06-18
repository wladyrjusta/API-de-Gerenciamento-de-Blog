const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const { UsersService } = require('../services');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const users = await UsersService.getAllUsersLoginInfos();

  const userExists = users && users
    .some((user) => user.email === email && user.password === password);

  if (!userExists) {
    return res.status(400).send({ message: 'Invalid fields' });
  }

  const user = users.filter((u) => u.email === email);

  const payload = {
    id: user[0].id,
    email: req.body.email,
    adm: false,
  };
    
  const token = jwt.sign(payload, JWT_SECRET);
    
  return res.status(200).json({ token });
};
