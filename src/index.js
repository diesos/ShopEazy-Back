const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const listRoutes = require("./routes/ListRoutes")
const Database = require("./services/db")



// Initialisation de l'application
// ===========================================================================================

require("dotenv").config();
const app = express();
const port = 9000;

// Database
// ===========================================================================================

// Database.getInstance();

const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB, URL:', MONGO_URL))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

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

    console.log(Database);
    console.log(`Server listening on http://localhost:${port}`);
});

module.exports = app;
