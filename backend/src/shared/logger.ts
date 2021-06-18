/**
 * Setup the winston logger.
 *
 * Documentation: https://github.com/winstonjs/winston
 */

import { createLogger, format, transports } from 'winston';


// Import Functions
const { File, Console } = transports;

// Init Logger
const logger = createLogger({
    level: 'info',
});

/* Container Logger: logs output additionally to the console so you can access it directly via docker. Also saves log to log files. */
export function logToConsole(msg: any) {

    /* tslint:disable-next-line */
    console.log(msg);

    if(msg !== null && typeof msg === 'object') {
        msg = JSON.stringify(msg);
    }
    logger.info(msg);
}

/**
 * For production write to all logs with level `info` and below
 * to `combined.log. Write all logs error (and below) to `error.log`.
 * For development, print to the console.
 */
const fileFormat = format.combine(
    format.timestamp(),
    format.json(),
);
const errTransport = new File({
    filename: './logs/error.log',
    format: fileFormat,
    level: 'error',
});
const infoTransport = new File({
    filename: './logs/combined.log',
    format: fileFormat,
});
logger.add(errTransport);
logger.add(infoTransport);


export default logger;