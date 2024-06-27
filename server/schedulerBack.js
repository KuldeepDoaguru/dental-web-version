const cron = require("node-cron");
const backupDatabase = require("./backup");

cron.schedule("*/1 * * * *", () => {
  backupDatabase();
});

module.exports = { backupDatabase };
