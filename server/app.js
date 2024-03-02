const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const receptionist_Routes = require("./routes/receptionist_Routes");
dotenv.config();
// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Dental Guru app</h1>");
});

// PORT
const PORT = process.env.PORT || 4000;

app.use('/api/v1/receptionist',receptionist_Routes);

// run listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
