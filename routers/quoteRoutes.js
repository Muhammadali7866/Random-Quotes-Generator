const quotesController = require("../controller/quotesController");
const authController = require("../controller/authController");
const express = require("express");
router = express.Router();

router.post(
  "/createQuote",
  authController.protect,
  quotesController.createQuote
);
router.post("/createQuote", authController.protect);

// router.get("/sendQuote", quotesController.sendQuote);

module.exports = router;
