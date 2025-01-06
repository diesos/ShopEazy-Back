const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const xss = require("xss");
const jwt = require("jsonwebtoken");
const { generateTokens } = require("../Tools/JWTTokens");
const { authLogin, registerUser } = require("../services/UserServices");



// Register a new user
// ============================================================================

module.exports.register = async (req, res) => {
  let userParams = req.body;
  if (!userParams.email || !userParams.password)
    return res.status(400).json({ error: "Email and password are required" });

  userParams.email = xss(userParams.email);
  userParams.password = xss(userParams.password);

  try {
    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: userParams.email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const newUser = await registerUser(userParams);

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Login
// ============================================================================

module.exports.login = async (req, res) => {
  let userParams = req.body;
  if (!userParams.email || !userParams.password)
    return res.status(400).json({ error: "Email and password are required" });

  userParams.email = xss(userParams.email);
  userParams.password = xss(userParams.password);

  try {
    const user = await authLogin(userParams);
    const tokens = generateTokens(user);

    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


// Reset password
// ============================================================================

module.exports.resetPassword = async (req, res) => {
  let { newPassword } = req.body;
  let userParams = req.user;
  
  // Validation de l'entrée
  if (!newPassword) return res.status(400).json({ error: "New password is required" });
  
  newPassword = xss(newPassword);
  
  try {
    // Trouver l'utilisateur par ID
    const user = await User.findById(userParams.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Hash du nouveau mot de passe
    user.password = await bcrypt.hash(newPassword, 10);

    // Enregistrer les modifications
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};