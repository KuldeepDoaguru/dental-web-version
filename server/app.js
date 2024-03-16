const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const {authRoutes} = require("./router/authRouter");

dotenv.config();
// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// REST API Routes
app.use("/api/doctor", authRoutes);

// PORT
const PORT = process.env.PORT || 8888;

// Run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
