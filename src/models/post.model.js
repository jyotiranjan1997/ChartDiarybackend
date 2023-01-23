const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  my_id: { type: mongoose.Schema.ObjectId, required: true },
  title: { type: String, require: true },
  tags: [],
  containt: { type: String },
});

const Post = mongoose.model("post", postSchema);

module.exports = { Post };
