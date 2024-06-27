const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const mysqldump = require("mysqldump");
const cron = require("node-cron");
const moment = require("moment-timezone");

dotenv.config();

const DB_USER = process.env.USER;
const DB_PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DATABASE;
const DB_HOST = process.env.HOST;
const BACKUP_DIR = path.join(__dirname, "backups");

console.log("Environment Variables:");
console.log(`DB_USER: ${DB_USER}`);
console.log(`DB_PASSWORD: ${DB_PASSWORD}`);
console.log(`DB_NAME: ${DB_NAME}`);
console.log(`DB_HOST: ${DB_HOST}`);
console.log(`BACKUP_DIR: ${BACKUP_DIR}`);

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const dateTime = moment().tz("Asia/Kolkata").format("DD-MM-YYYY");
async function backupDatabase() {
  const timestamp = new Date().toISOString();

  console.log(timestamp);
  const backupFile = path.join(BACKUP_DIR, `${DB_NAME}-${dateTime}.sql`);
  console.log(`Backup file path: ${backupFile}`);
  try {
    await mysqldump({
      connection: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      },
      dumpToFile: backupFile,
    });
    console.log(`Backup created: ${backupFile}`);
  } catch (err) {
    console.error(`Error creating backup: ${err.message}`);
    console.error(err);
  }
}

cron.schedule("*/5 * * * * *", () => {
  backupDatabase();
});

module.exports = backupDatabase;
