const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {authRoutes} = require("./router/authRouter");
const { zipLogs } = require("./scheduler");


dotenv.config();
// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// REST API Routes
app.use("/api/lab", authRoutes);

// PORT
const PORT = process.env.PORT || 8888;

// Run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
zipLogs();

// run listen