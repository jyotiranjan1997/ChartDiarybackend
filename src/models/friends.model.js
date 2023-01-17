const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  my_id: { type: mongoose.Schema.ObjectId, required: true },
  is_Accepted: { type: Boolean, default: false },
  is_requested: { type: Boolean, required: true },
  friend_id: { type: mongoose.Schema.ObjectId, required: true },
});

const Friend = mongoose.model("friend", friendSchema);

module.exports = { Friend };
