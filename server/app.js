const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { authRoutes } = require("./router/authRouter");
require("./backup");

dotenv.config();
// Create Express app
const app = express();
const BACKUP_DIR = path.join(__dirname, "backups");

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/backup/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(BACKUP_DIR, filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send("File not found");
  }
});

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// REST API Routes
app.use("/api/doctor", authRoutes);

// PORT
const PORT = process.env.PORT || 8888;

// Run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
