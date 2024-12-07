const jwt = require('jsonwebtoken');
const { User } = require('../model');
const config = require('../config/config');

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header is required' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token is required' });
    }

    const payload = jwt.verify(token, config.jwtSecret);
    console.log('Payload:', payload); // Debug payload

    const user = await User.findByPk(payload.id);
    if (!user) {
      console.log('User not found for ID:', payload.id); // Debug user existence
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.error('Error in verifyToken middleware:', error); // Debug error
    res.status(500).json({ message: error.message });
  }
};

module.exports = { verifyToken };
