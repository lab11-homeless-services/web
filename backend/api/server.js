const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

//Middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

//Sanity Check
server.get("/", async (req, res) => {
  return res.status(200).json({ message: "testing" });
});

//Routes
const categoriesRouter = require("../routes/categories-router.js");

//Endpoints
server.use("/api/categories", categoriesRouter);

module.exports = server;
