const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: { type: String },
  about: { type: String },
  
});

const User = mongoose.model("user", userSchema);

module.exports = { User };
