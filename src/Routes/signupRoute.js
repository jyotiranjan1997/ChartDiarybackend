const express = require("express");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const signupRoute = express.Router();
const privateKey = process.env.secret_key0;
const {
  authMiddleware,
  authPasswordChecker,
  friendsMiddleware,
} = require("../middleware/auth.middleware");
const { Friend } = require("../models/friends.model");

// Signup //

signupRoute.post("/signup", authMiddleware, async (req, res) => {
  const data = req.body;
  try {
    const user = await User.create(data);

    res.status(200).send({ msg: "Successfully User Signned up" });
  } catch (err) {
    res.status(500).send({ msg: "Failed User Signned up" });
  }
});

// Login with Token generate

signupRoute.post("/login", authPasswordChecker, async (req, res) => {
  const { user } = req.body;
  try {
    if (user) {
      jwt.sign({ user: user }, privateKey, function (err, token) {
        if (err) {
          res.status(500).send({ msg: "unable to Login" });
        }
        if (token) {
          res
            .status(200)
            .send({ msg: "Successfully User loggedin", user_token: token });
        }
      });
    } else {
      res.status(500).send({ msg: "unbale to find user" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Failed User Signned up" });
  }
});

//Search Frinds by Name of User

signupRoute.get("/friends", async (req, res) => {
  try {
    const { name } = req.query;
    let users = await User.find({ $name: { $search: name } });
    let newUsers = users.filter((el) => {
      return (el.password = "...");
    });

    res.status(200).send({ msg: "users find Successfully", users: newUsers });
  } catch (err) {
    res.status(500).send(err);
  }
});

signupRoute.patch("/update", friendsMiddleware, async (req, res) => {
  const { user_id, name, email, address, dateOfBirth } = req.body;
  try {
    let user = await User.findByIdAndUpdate(
      {
        _id: user_id,
      },
      {
        name,
        email,
        address,
        dateOfBirth,
      }
    );
    res.status(200).send({ msg: "user data updated successfully !" });
  } catch (err) {
    res.status(500).send({ msg: "user data updated Failed" });
  }
});

module.exports = { signupRoute };
