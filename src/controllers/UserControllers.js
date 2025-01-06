const User = require("../models/userModels");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  let { email, password, firstName, lastName, shopList = [] } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      shopList,
    });

    await newUser.save();


    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

