require("dotenv").config();

const express = require("express");
const cors = require("cors");
const movieRoutes = require("./routes/movie.routes");
const authRoutes = require("./routes/auth.routes");
const { notFound, errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "Netflix Clone API is running" });
});

app.use("/movies", movieRoutes);
app.use("/", authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;