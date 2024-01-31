const jwt = require('jsonwebtoken')
require('dotenv').config();
const secretKey = process.env.secretKey

async function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Please Login!' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], secretKey);

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token verification failed' });
  }
}

module.exports =  authenticateToken ;
