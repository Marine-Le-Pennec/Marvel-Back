const express = require("express");
const axios = require("axios");

const router = express.Router();

// Crypto

const md5 = require("md5");

// Fonction timestamp

const timeStampFunc = () => {
  const date = new Date();
  const timestamp = date.getTime() / 1000;
  return String(Math.floor(timestamp));
};

// Route pour la recherche de personnages
router.get("/characters", async (req, res) => {
  try {
    //   Identification
    let ts = timeStampFunc();
    let hash = md5(
      ts + process.env.PRIVATE_API_KEY + process.env.PUBLIC_API_KEY
    );

    // query offset
    let offset = req.query.offset;

    // Envoie de la réponse
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?&limit=100&offset=${offset}&ts=${ts}&apikey=${process.env.PUBLIC_API_KEY}&hash=${hash}`
    );

    res.json(response.data);
  } catch (error) {
    console.log("error characters", error.message);
  }
});

//Route pour la recherche de comics
router.get("/comics", async (req, res) => {
  try {
    // Identification

    let ts = timeStampFunc();
    let hash = md5(
      ts + process.env.PRIVATE_API_KEY + process.env.PUBLIC_API_KEY
    );
    let offset = req.query.offset;

    // Envoie de la réponse
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?limit=100&offset=${offset}&ts=${ts}&apikey=${process.env.PUBLIC_API_KEY}&hash=${hash}`
    );

    res.json(response.data);
  } catch (error) {
    console.log("error comics", error.message);
  }
});
module.exports = router;
