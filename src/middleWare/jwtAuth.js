const jwt = require('jsonwebtoken');
const User = require('../models/userModels.js');

/**
 * Middleware pour vérifier l'authentification par JWT et ajouter l'utilisateur à la requête.
 */
const jwtAuth = async (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY) return res.status(500).json({ success: false, error: 'Clé secrète manquante' });

  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return res.status(401).json({ success: false, error: 'Token manquant' });

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });

    req.user = user;

    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error.message);
    return res.status(401).json({ success: false, error: 'Token invalide ou expiré' });
  }
};

module.exports = { jwtAuth };
