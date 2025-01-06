const User = require("../models/userModels");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  let { email, password, firstName, lastName } = req.body;

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
    });

    // await newUser.save();

    console.log("NEW USER" + newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

