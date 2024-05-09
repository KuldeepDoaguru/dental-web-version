const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const { join, dirname } = require("path");
const { fileURLToPath } = require("url");
const bodyParser = require("body-parser");
const superAdminRoutes = require("./Routes/superAdminRoutes");
const { zipLogs } = require("./scheduler");

dotenv.config();
// rest object
const app = express();
app.use(express.static("reciept_doc"));
app.use(express.static("empProfilePicture"));
app.use(express.static(join(__dirname, "build")));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// middlewares
app.use(cors());
app.use(express.json());

app.use("/reciept_doc", express.static(join(__dirname, "reciept_doc")));
app.use(
  "/empProfilePicture",
  express.static(join(__dirname, "empProfilePicture"))
);
// routes
app.use("/api/v1/super-admin", superAdminRoutes);

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

// PORT
const PORT = process.env.PORT || 8888;

// zipLogs();
// run listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`.bgCyan.white);
});
