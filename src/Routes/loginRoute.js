const express = require("express");

const loginRoute = express.Router();

loginRoute.post("/", async (req, res) => {});

module.exports = { loginRoute };
