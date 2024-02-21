const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dental_guru",
});

// Connect to the databases
db.connect((err) => {
  if (err) {
    console.error("Error connecting to db1:", err);
  } else {
    console.log("Connected to db1!");
  }
});

module.exports = { db };
