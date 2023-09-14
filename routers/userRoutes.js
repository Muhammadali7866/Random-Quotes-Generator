const { userModel } = require("./../models");
const { signUp } = require("./../controller/authController");
const express = require("express");
const router = express.Router();
router.post("/signup", signUp);

module.exports = router;
