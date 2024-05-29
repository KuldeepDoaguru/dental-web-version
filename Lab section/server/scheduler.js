const fs = require("fs");
const archiver = require("archiver");
const cron = require("node-cron");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Function to zip logs older than 7 days
const zipLogs = async () => {
  try {
    const logsFile = "lab-attentant.log"; // Path to the log file
    const archiveDir = "logs/archive"; // Define the archive directory
    const timestamp = new Date().toISOString().replace(/:/g, "-"); // Human-readable timestamp
    const outputDir = `${archiveDir}/logs-${timestamp}.zip`; // Define the output directory path
    const output = fs.createWriteStream(outputDir);
    const archive = archiver("zip");

    // Ensure the archive directory exists
    fs.mkdirSync(archiveDir, { recursive: true });

    // Check if the log file exists
    const exists = fs.existsSync(logsFile);
    if (!exists) {
      throw new Error("Log file does not exist");
    }

    // Read and parse log file
    const logContent = fs.readFileSync(logsFile, "utf8").trim();
    if (logContent === "") {
      console.log("Log file is empty");
      return;
    }

    const logs = logContent.split("\n").map((entry) => JSON.parse(entry));
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const filteredLogs = logs.filter((log) => {
      const logTimestamp = new Date(log.timestamp);
      return logTimestamp >= sevenDaysAgo;
    });

    if (filteredLogs.length === 0) {
      console.log("No logs older than 7 days found");
      return;
    }

    // Check if there are logs older than today
    const olderLogs = logs.filter((log) => {
      const logTimestamp = new Date(log.timestamp);
      return logTimestamp < sevenDaysAgo;
    });

    if (olderLogs.length === 0) {
      console.log("No logs older than today found");
    } else {
      // Update the log file with logs younger than 7 days
      fs.writeFileSync(
        logsFile,
        filteredLogs.map((log) => JSON.stringify(log)).join("\n")
      );

      // Add older logs to the archive
      olderLogs.forEach((log) => {
        archive.append(JSON.stringify(log), { name: logsFile });
      });

      output.on("close", () => {
        console.log("Logs archived successfully");
      });

      archive.pipe(output);
      archive.finalize();
    }
  } catch (error) {
    console.error("Error zipping logs:", error);
  }
};

// Schedule the task to run daily
// This will run at 00:00 every day
cron.schedule("0 0 * * *", () => {
  zipLogs();
});

module.exports = { zipLogs };



// const fs = require("fs");
// const archiver = require("archiver");
// const { promisify } = require("util");

// const readdir = promisify(fs.readdir);
// const stat = promisify(fs.stat);

// // Function to zip logs older than 7 days
// const zipLogs = async () => {
//   try {
//     const logsFile = "lab-attentant.log"; // Path to the log file
//     const archiveDir = "logs/archive"; // Define the archive directory
//     const timestamp = new Date().toISOString().replace(/:/g, "-"); // Human-readable timestamp
//     const outputDir = `${archiveDir}/logs-${timestamp}.zip`; // Define the output directory path
//     const output = fs.createWriteStream(outputDir);
//     const archive = archiver("zip");

//     // Ensure the archive directory exists
//     fs.mkdirSync(archiveDir, { recursive: true });

//     // Check if the log file exists
//     const exists = fs.existsSync(logsFile);
//     if (!exists) {
//       throw new Error("Log file does not exist");
//     }

//     // Read and parse log file
//     const logContent = fs.readFileSync(logsFile, "utf8").trim();
//     if (logContent === "") {
//       console.log("Log file is empty");
//       return;
//     }

//     const logs = logContent.split("\n").map((entry) => JSON.parse(entry));

//     // Add logs to the archive
//     logs.forEach((log) => {
//       archive.append(JSON.stringify(log), { name: logsFile });
//     });

//     output.on("close", () => {
//       console.log("Logs archived successfully");
//     });

//     archive.pipe(output);
//     archive.finalize();
//   } catch (error) {
//     console.error("Error zipping logs:", error);
//   }
// };

// // Schedule the task to run every 20 seconds
// setInterval(() => {
//   zipLogs();
// }, 20000); // 20 seconds in milliseconds

// module.exports = { zipLogs };


// const cron = require("node-cron");
// const fs = require("fs");
// const archiver = require("archiver");
// const { format } = require("date-fns");

// function runScheduler() {
//   console.log("Scheduler started.");

//   // Schedule a task to run every 20 seconds
//   cron.schedule("0 0 * * *", () => {
//     console.log("Cron job running...");

//     const timestamp = format(new Date(), "yyyyMMddHHmmss");
//     const zipFileName = `lab-attentant-${timestamp}.zip`;

//     // Create a new zip archive
//     const output = fs.createWriteStream(zipFileName);
//     const archive = archiver("zip");

//     output.on("close", () => {
//       console.log(`${zipFileName} has been created successfully.`);
//     });

//     archive.on("error", (err) => {
//       console.error(`Failed to create ${zipFileName}:`, err);
//     });

//     // Add lab-attentant.log to the zip archive
//     archive.file("lab-attentant.log", { name: "lab-attentant.log" });

//     // Finalize the archive and write it to the output stream
//     archive.pipe(output);
//     archive.finalize();
//   });
// }

// module.exports = runScheduler;
