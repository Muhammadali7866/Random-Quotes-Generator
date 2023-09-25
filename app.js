const express = require("express");
const userRoutes = require("./routers/userRoutes");
const quoteRoutes = require("./routers/quoteRoutes");
const app = express();
app.use(express.json());
const AppError = require("./utils/appError");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/quotes", quoteRoutes);
module.exports = app;
