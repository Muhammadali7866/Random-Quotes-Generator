const { userModel } = require("./../models");
const {
  signUp,
  login,
  protect,
  deleteUser,
  allUser,
} = require("./../controller/authController");
const express = require("express");
const router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
router.post("/deleteUser/:id", deleteUser);
router.get("/allUser", allUser);

module.exports = router;
