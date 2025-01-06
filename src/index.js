const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const listRoutes = require("./routes/ListRoutes")
const Database = require("./services/db")
const mongoose = require('mongoose');
const colors = require('@colors/colors');




// Initialisation de l'application
// ===========================================================================================

require("dotenv").config();
const app = express();
const port = 9000;

// Database
// ===========================================================================================

// Database.getInstance();


const MONGO_URL = process.env.MONGO_URL

mongoose
  .connect(MONGO_URL)
  .then(() => console.log(`🚀 ------------------------------------ 🚀
    ✅ ✅ Succes : ${'Connected to MongoDB'.rainbow.bold.underline}
    🚀 ------------------------------------ 🚀`))
  .catch((err) => console.error('Failed to connect to MongoDB'.error, err));

// Middleware
// ===========================================================================================

app.use(cors());
app.use(express.json()); // Middleware pour parser les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Middleware pour parser les requêtes POST

// Routes
// ===========================================================================================

app.get("/", (_, res) => { res.send("ShopEazy sexy lady Oliver Twist")});
app.use("/user", userRoutes);
app.use("/list", listRoutes)

// Démarrage du serveur uniquement si l'environnement n'est pas en mode test
// ===========================================================================================

app.listen(port, () => {
  console.clear();
    console.log(Database);
    console.log(`
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠷⠾⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⢠⣄⣀⣀⣤⣤⣤⡶⢿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡷⠶⣶⡶⠆⠀⠀⠈⠉⠉⠉⠉⠁⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠘⠛⠛⠛⠛⠃⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠰⢶⣶⠶⠶⠾⠛⢻⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⡶⠶⠄⠀⠀⠶⠶⠶⠖⠚⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣤⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠠⠿⠟⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣄⣀⣀⣀⣀⣠⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`)
console.log(`✅ ✅` + `Server listening on http://localhost:${port}`.green.bold + `✅ ✅`.green);
console.log('📦 Database Status:', 'Waiting for connection '.yellow);
console.log(`🚀 Server running at: ${`http://localhost:${port}`.green.bold}`);
console.log('💡 Ready to handle requests!');
});

module.exports = app;
