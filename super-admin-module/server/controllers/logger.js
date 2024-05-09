const { createLogger, transports, format } = require("winston");

const { format: dateFormat } = require("date-fns-tz");

const IST_TIMEZONE = "Asia/Kolkata";

const customTimestamp = () => {
  return dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss.SSS zzz", {
    timeZone: IST_TIMEZONE,
  });
};

const registrationLogger = createLogger({
  transports: [
    new transports.File({
      filename: "superadmin.log",
      level: "info",
      format: format.combine(
        format.timestamp({ format: customTimestamp }),
        format.json()
      ),
    }),
    // new transports.File({
    //   filename: "superadmin-error.log",
    //   level: "error",
    //   format: format.combine(
    //     format.timestamp({ format: customTimestamp }),
    //     format.json()
    //   ),
    // }),
  ],
});

module.exports = { registrationLogger };
