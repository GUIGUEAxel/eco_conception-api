// middleware/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extraction du jeton du format "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Pas de jeton fourni' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Jeton expiré' });
      }
      return res.status(403).json({ message: 'Jeton invalide' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
