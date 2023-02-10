import winston from 'winston';
import vars from './vars';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { app: vars.app },
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({ level: 'error', filename: '.logs/log.json' }),
  ],
});

export default logger;
