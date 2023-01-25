const express = require("express");
const { Post } = require("../models/post.model");
const { friendsMiddleware } = require("../middleware/auth.middleware");
const postRoute = express.Router();

postRoute.post("/addpost",friendsMiddleware, async (req, res) => {
  const { user_id,image_url, tags, title, containt } = req.body;
  try {
    await Post.create({ my_id: user_id,image_url, title, containt, tags });
    res.status(200).send({ msg: "posted Successfully ! " });
  } catch (err) {
    res.status(500).send({ msg: "failed to post !" });
  }
});

postRoute.get("/",friendsMiddleware, async (req, res) => {
  const { user_id } = req.body;
  try {
    let posts = await Post.find({ my_id: user_id });
    res.status(200).send({ msg: "posted Successfully ! ", posts });
  } catch (err) {
    res.status(500).send({ msg: "failed to post !" });
  }
});

module.exports = { postRoute };
