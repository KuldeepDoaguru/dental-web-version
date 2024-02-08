const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

// PORT
const PORT = process.env.PORT || 8888;

// run listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`.bgCyan.white);
});
