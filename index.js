// Importation Express
const express = require("express");
const app = express();
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");

require("dotenv").config();
app.use(formidableMiddleware());

//Mongoose

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Importation cors
const cors = require("cors");
app.use(cors());

// Appel de la route pour recherche des personnages et des comics
const marvelbddRoutes = require("./routes/marvelbdd");
// const favoris = require("./routes/favoris");
const userRoutes = require("./routes/User");
app.use(marvelbddRoutes);
app.use(userRoutes);

// Page d'accueil
app.get("/", (req, res) => {
  res.json(console.log("Bienvenue sur la base de données Marvel"));
});

// Route par defaut
app.all("*", function (req, res) {
  res.json({ message: "all routes" });
});

// Ecoute du port
app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
