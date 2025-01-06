const jwt = require('jsonwebtoken');
const User = require('../models/userModels.js'); // Assurez-vous que votre modèle User est correctement importé

/**
 * Vérifie le token d'authentification et retourne l'utilisateur associé.
 * @param {string} token - Le token JWT à vérifier.
 * @returns {Promise<object>} L'utilisateur récupéré ou une erreur.
 */
const verifyUser = async (token) => {
  try {

	const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.userId;

	const user = await User.findById(userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { verifyUser };
