const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const receptionist_Routes = require("./routes/receptionist_Routes");
dotenv.config();
const cron = require('node-cron');


// rest object
const app = express();
const {sendEmails} = require("./cron/sendAppointmentEmails");
// middlewares
app.use(cors());
app.use(express.json());
const { zipLogs } = require("./scheduler");

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Dental Guru app</h1>");
});

// PORT
const PORT = process.env.PORT || 4000;

app.use('/api/v1/receptionist',receptionist_Routes);

// Schedule the cron job to send appointment emails
cron.schedule('0 8 * * *', () => {
  console.log('Sending emails for appointments scheduled for today...');
  sendEmails();
},{
  scheduled: true,
  timezone: "Asia/Kolkata"
});


// Schedule the cron job to log the zip codes
// Schedule the task to run daily
// This will run at 00:00 every day


cron.schedule("0 0 * * *", () => {
  zipLogs();
});



// run listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

