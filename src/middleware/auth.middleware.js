const bcrypt = require("bcrypt");
var saltRounds = JSON.parse(process.env.salt);
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const privateKey = process.env.secret_key0;

const authMiddleware = async (req, res, next) => {
  const { password } = req.body;
  await bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.

    if (err) {
      res.status(500).send({ msg: "Error to store Password" });
    }
    if (hash) {
      req.body.password = hash;
      next();
    }
  });
};

const authPasswordChecker = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.status(500).send({ msg: "Error to store Password" });
        }
        if (result) {
          req.body.user = user;
          next();
        } else {
          res.status(500).send({ msg: "password Incorrect !" });
        }
      });
    }
  } catch (err) {}
};

const friendsMiddleware = (req, res, next) => {
  const { auth } = req.headers;

  jwt.verify(auth, privateKey, function (err, decoded) {
    if (err) {
      res.status(500).send({ msg: "error to Verify User !" });
    }

    if (decoded) {
      req.body.user_id = decoded.user._id;
      next();
    }
  });
};

module.exports = { authMiddleware, authPasswordChecker, friendsMiddleware };
