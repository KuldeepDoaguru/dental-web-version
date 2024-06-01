const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const { join, dirname } = require("path");
const { fileURLToPath } = require("url");
const adminRout = require("./routes/AdminRoutes");

dotenv.config();
// rest object
const app = express();
app.use(express.static("reciept_doc"));
app.use(express.static("empProfilePicture"));
app.use(express.static(join(__dirname, "build")));

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/admin", adminRout);
app.use("/reciept_doc", express.static(join(__dirname, "reciept_doc")));
app.use(
  "/empProfilePicture",
  express.static(join(__dirname, "empProfilePicture"))
);
app.get("*", (req, res, next) => {
  // If the request is for an API route, skip serving the React HTML file
  if (req.url.startsWith('/api')) {
    return next();
  }
  
  // Otherwise, serve the React HTML file
  res.sendFile(join(__dirname, "build", "index.html"));
});

// rest api
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to ecommerce app</h1>");
// });

// PORT
const PORT = process.env.PORT;

// run listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
