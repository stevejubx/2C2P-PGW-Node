const winston = require("winston");

function setupLogger(debug) {
  if (debug == true) {
    return winston.createLogger({
      level: "debug",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [new winston.transports.File({ filename: "api.log" })],
    });
  } else {
    return {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    };
  }
}

module.exports = setupLogger;
