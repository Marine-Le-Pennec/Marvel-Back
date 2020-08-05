// Importation Express
const express = require("express");
const app = express();

require("dotenv").config();

// Importation cors
const cors = require("cors");
app.use(cors());

// Appel de la route pour recherche des personnages et des comics
const marvelbddRoutes = require("./routes/marvelbdd");
app.use(marvelbddRoutes);

// Page d'accueil
app.get("/", (req, res) => {
  res.json("Bienvenue sur la base de données Marvel");
});

// Route par defaut
app.all("*", function (req, res) {
  res.json({ message: "all routes" });
});

// Ecoute du port
app.listen(3000, () => {
  console.log("Server has started");
});
