// const winston = require('winston');
// const { format } = require('winston');
// const fs = require('fs');
// const path = require('path');

// // Create logs directory if it doesn't exist
// const logsDir = 'logs';
// if (!fs.existsSync(logsDir)) {
//     fs.mkdirSync(logsDir);
// }

// // Create a logger instance
// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console(),
//         new winston.transports.File({ filename: path.join(logsDir, 'logfile.log') })
//     ],
//     format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.simple()
//     )
// });

// // Optionally, set log level
// logger.level = 'info'; // Set the log level according to your preference

// module.exports = {
//     logger
// }


const winston = require('winston');
const { format } = require('winston');
const { createLogger, transports } = winston;
const { combine, timestamp, printf } = format;
const { format: dateFormat } = require('date-fns-tz');

// Define the format with timezone
const customFormat = printf(({ level, message, timestamp }) => {
    const tzTimestamp = dateFormat(timestamp, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Asia/Kolkata' });
    return `${tzTimestamp} [${level.toUpperCase()}]: ${message}`;
});

const IST_TIMEZONE = "Asia/Kolkata";

const customTimestamp = () => {
  return dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss.SSS zzz", {
    timeZone: IST_TIMEZONE,
  });
};
// Create a logger instance
const logger = createLogger({
    transports: [
        
        new transports.File({
            filename: 'logs/logfile.log',
            format: combine(
                format.timestamp({ format: customTimestamp }),
                format.json()
            ),
            
        })
    ]
});

// Optionally, set log level
logger.level = 'info'; // Set the log level according to your preference


module.exports = {
    logger
}