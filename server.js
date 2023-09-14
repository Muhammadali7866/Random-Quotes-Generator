const app = require("./app");
const express = require("express");
require("./utils/db");

const dotenv = require("dotenv").config();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listining to the Port ${PORT}`);
});
