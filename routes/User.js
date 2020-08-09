const express = require("express");

const app = express();
const formidableMiddleware = require("express-formidable");
const router = express.Router();

const UserIngo = require("../models/UserInfo");

//Import crypto
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

//Création d'un utilisateur
router.post("/user/signup", async (req, res) => {
  // password cryptage
  const password = req.fields.password;
  const salt = uid2(16);
  const hash = SHA256(password + salt).toString(encBase64);
  const token = uid2(16);

  if ((await UserInfo.findOne({ email: req.fields.email })) !== null) {
    res.status(400).json({ error: "Email already registered" });
  } else if (req.fields.username === null) {
    res.status(400).json({ error: "No username" });
  } else {
    //Sinon, on créer un nouvel user
    try {
      const newUser = new UserInfo({
        email: req.fields.email,
        token: token,
        hash: hash,
        salt: salt,
        account: {
          username: req.fields.username,
        },
      });

      //On sauvegarde le tout

      await newUser.save();

      const returnInfo = {
        _id: newUser._id,
        email: req.fields.email,
        token: token,
        account: {
          username: req.fields.username,
        },
      };
      res.status(200).json(returnInfo);
    } catch (error) {
      res.status(402).json({ error: error.message });
    }
    res.status(402).json({ error: message });
  }
});

//Log-in
router.post("/user/log_in", async (req, res) => {
  try {
    const login = await UserInfo.findOne({ email: req.fields.email });
    const password = req.fields.password;
    const hash = SHA256(password + login.salt).toString(encBase64);

    if (hash === login.hash) {
      const infoReturned = {
        _id: login._id,
        token: login.token,
        account: login.account,
      };
      res.json(infoReturned);
    } else {
      res.json("login error");
    }
  } catch (error) {
    res.status(418).json({ error: error.message });
  }
});

module.exports = router;
