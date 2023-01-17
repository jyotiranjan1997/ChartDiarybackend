const express = require("express");
const { User } = require("../models/user.model");
const frindsRouter = express.Router();
const { Friend } = require("../models/friends.model");
const { friendsMiddleware } = require("../middleware/auth.middleware");


frindsRouter.post("/addfriend", friendsMiddleware, async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    const frindCard = await Friend.create({
      my_id: user_id,
      is_requested: true,
      friend_id: friend_id,
    });
    res.status(200).send({ msg: "Friend Request send Successfully" });
  } catch (err) {
    res.status(500).send({ msg: "Friend Request sending Failed" });
  }
});



frindsRouter.get("/", friendsMiddleware, async (req, res) => {
  const { user_id } = req.body;

  try {
      const frinds = await Friend.find({ $or: [{ my_id: user_id, is_Accepted: true }, { friend_id: user_id, is_Accepted: true }] });
    res.status(200).send({ msg: "All your friend List",frinds });
  } catch (err) {
    res.status(500).send({ msg: "your friend List sending Failed" });
  }
});


frindsRouter.get("/friendrequest", friendsMiddleware, async (req, res) => {
  const { user_id } = req.body;

  try {
    const frinds = await Friend.find({friend_id:user_id,is_requested:true})
    res.status(200).send({ msg: "All your friend request List", frinds });
  } catch (err) {
    res.status(500).send({ msg: "your friend List sending Failed" });
  }
});



frindsRouter.get("/accept", friendsMiddleware, async (req, res) => {
  const { user_id } = req.body;

  try {
    const frinds = await Friend.find({
        my_id: user_id,
        is_Accepted:true,
    });
    res.status(200).send({ msg: "All your friend Accepted Request", frinds });
  } catch (err) {
    res.status(500).send({ msg: "your friend List sending Failed" });
  }
});





frindsRouter.patch("/addfriend", friendsMiddleware, async (req, res) => {
  const { user_id, friend_id } = req.body;
console.log(user_id,friend_id)
  try {
    const frindCard = await Friend.findOneAndUpdate({
      my_id: friend_id,
      is_requested: false,
      is_Accepted: true,
      friend_id: user_id,
    });
    res.status(200).send({ msg: "Friend Request Accepted Successfully",friend:frindCard });
  } catch (err) {
    res.status(500).send({ msg: "Friend Request Accept Failed" });
  }
});

frindsRouter.delete("/addfriend", friendsMiddleware, async (req, res) => {
  const { user_id, friend_id } = req.body;

  try {
    const frindCard = await Friend.findOneAndDelete({my_id:user_id,friend_id})
    res.status(200).send({ msg: "Unfriend Successfully" });
  } catch (err) {
    res.status(500).send({ msg: "Unfriend Failed" });
  }
});

module.exports = { frindsRouter };
