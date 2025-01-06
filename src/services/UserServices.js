const User = require("../models/userModels");
const bcrypt = require("bcrypt");


// Login
// ============================================================================

module.exports.authLogin = async (userParams) => {
  const { email, password } = userParams;
  if (!email || !password) throw new Error("Email and password are required");

  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Invalid credentials");

  return user;
};


// Register
// ============================================================================

module.exports.registerUser = async (userParams) => {
  // Vérifiez si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email: userParams.email });
  if (existingUser) throw new Error("User already exists");

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(userParams.password, 10);

  // Création de l'utilisateur
  const newUser = new User({
    email: userParams.email,
    password: hashedPassword,
    firstName: userParams.firstName,
    lastName: userParams.lastName,
    shopList: userParams.shopList,
  });

  // Enregistrement dans la base de données
  return await newUser.save();
};


// Reset Password
// ============================================================================

module.exports.resetUserPassword = async ({ email, password }) => {
  if (!email || !password) throw new Error("Email and password are required");

  // Trouvez l'utilisateur par email
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // Hash le nouveau mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Réinitialisez le mot de passe
  user.password = hashedPassword;
  await user.save();

  return { message: "Password reset successfully" };
};