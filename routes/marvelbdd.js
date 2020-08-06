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

    // query offset et name
    let offset = req.query.offset;

    let name;
    if (req.query.name) {
      name = req.query.name;
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&limit=100&offset=${offset}&ts=${ts}&apikey=${process.env.PUBLIC_API_KEY}&hash=${hash}`
      );

      res.json(response.data);
    } else {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?limit=100&offset=${offset}&ts=${ts}&apikey=${process.env.PUBLIC_API_KEY}&hash=${hash}`
      );

      res.json(response.data);
    }
    console.log(name);
    // Envoie de la réponse
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
    let title;

    // Si il y a quelque chose dans une query qui s'appelle title, alors on fait la requete sur cette url
    if (req.query.title) {
      title = req.query.title;
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/comics?titleStartsWith=${title}&orderBy=title&limit=100&offset=${offset}&ts=${ts}&apikey=${process.env.PUBLIC_API_KEY}&hash=${hash}`
      );

      res.json(response.data);
    } else {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/comics?orderBy=title&limit=100&offset=${offset}&ts=${ts}&apikey=${process.env.PUBLIC_API_KEY}&hash=${hash}`
      );

      res.json(response.data);
    }

    // Envoie de la réponse
  } catch (error) {
    console.log("error comics", error.message);
  }
});

// Route recherche par id
router.get("/character/:id", async (req, res) => {
  try {
    // Identification

    let ts = timeStampFunc();
    let hash = md5(
      ts + process.env.PRIVATE_API_KEY + process.env.PUBLIC_API_KEY
    );

    let id = req.params.id;

    // Envoie de la réponse
    const response = await axios.get(
      `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?orderBy=title&ts=${ts}&apikey=${process.env.PUBLIC_API_KEY}&hash=${hash}`
    );

    res.json(response.data);
  } catch (error) {
    console.log("error comics", error.message);
  }
});

module.exports = router;
