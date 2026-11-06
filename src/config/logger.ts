import winston from "winston";
import path from "path";

const logDirectory = path.join(process.cwd(), "logs");

const logger = winston.createLogger({

    level: process.env.LOG_LEVEL || "debug",

    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.errors({
            stack: true
        }),
        winston.format.json()
    ),

    transports: [

        // Display logs in terminal
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message, stack }) => {
                    return `${timestamp} [${level}]: ${stack || message}`;
                })
            )
        }),

        // Store application logs
        new winston.transports.File({
            filename: path.join(logDirectory, "application.log"),
            level: "info"
        }),

        // Store errors separately
        new winston.transports.File({
            filename: path.join(logDirectory, "error.log"),
            level: "error"
        })

    ]

});

export default logger;