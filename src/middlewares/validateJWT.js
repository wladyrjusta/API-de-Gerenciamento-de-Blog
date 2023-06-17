const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.email) {
        return next();
    }    
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
