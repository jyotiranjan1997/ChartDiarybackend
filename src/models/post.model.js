const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  my_id: { type: mongoose.Schema.ObjectId, required: true },
  image_url: { type: String, require: true },
  title: { type: String, require: true },
  tags: [],
  containt: { type: String },
  likes: { type: Number },
});

const Post = mongoose.model("post", postSchema);

module.exports = { Post };
