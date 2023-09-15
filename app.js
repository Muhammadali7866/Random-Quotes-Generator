const express = require("express");
const userRoutes = require("./routers/userRoutes");
const app = express();
app.use(express.json());
const AppError = require("./utils/appError");

app.use("/api/v1/users", userRoutes);

module.exports = app;
