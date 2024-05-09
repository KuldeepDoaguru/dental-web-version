const fs = require("fs");
const archiver = require("archiver");
const cron = require("node-cron");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Function to zip logs older than 7 days
const zipLogs = async () => {
  try {
    const logsFile = "superadmin.log"; // Path to the log file
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
