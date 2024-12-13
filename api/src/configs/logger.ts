import winston, { Logger } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, align, label } = winston.format;


const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 3,
    debug: 4,
    trace: 5,
    verbose: 6,
    silly: 7,
};
const levelIcons = {
    debug: '👾', 
    info: 'ℹ️',
    warn: '⚠️',
    error: '❌', 
    fatal: '☠️',
    trace: '👣',
    http: '🌐',
    silly: '🤪',
    verbose: '🗨️',
};

const DailyRotateTransport = (level: string, filename: string) => {
    return new winston.transports.DailyRotateFile({
        dirname: `./.logs/%DATE%/`,
        filename: `${filename}`,
        datePattern: 'DD-MM-YYYY', 
        level: level, 
        zippedArchive: true,
        maxSize: '20m', 
        maxFiles: '14d',
        auditFile: `./.logs/.audit/${level}-audit-log.json`,
    });
};

const createLogger = (labelName: string): Logger => {
    return winston.createLogger({
        levels: logLevels,
        level: process.env.NODE_ENV === "dev" 
        ? process.env.LOG_LEVEL || 'debug'
        : 'info', 
        format: combine(
            label({ label: labelName }),
            timestamp({format: 'DD-MM-YYYY - HH:mm:ss'}),
            align(),
            printf(({ level, message, label, timestamp }) => {
                const icon: string = levelIcons[level as keyof typeof logLevels]  || '❔';
                const formattedLevel = process.env.NODE_ENV === "dev"
                ? colorize().colorize(level, level.toUpperCase())
                : level.toUpperCase();
                return `[${timestamp}]  ${icon} ${formattedLevel} - ${label} : ${message}`
            })
        ),
        transports: 
        process.env.NODE_ENV === "dev"

        ? [ new winston.transports.Console()]
        : [
            DailyRotateTransport('info', 'combined.log'),
            DailyRotateTransport('warn', 'warn.log'),
            DailyRotateTransport('error', 'error.log'),
        ]
        

    })
}
console.log(process.env.NODE_ENV)

const routesLogger = createLogger('routes');
const dbLogger = createLogger('DB');
const apiLogger = createLogger('API');
const controllersLogger = createLogger('controllers');
const servicesLogger = createLogger('services');
const serverLogger = createLogger('server')
const httpLogger = createLogger('http')
const errorLogger = createLogger('errorHandler')

export { routesLogger, dbLogger, apiLogger, controllersLogger, servicesLogger, serverLogger, httpLogger , errorLogger};
