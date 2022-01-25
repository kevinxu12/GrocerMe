/**
 * @file Logger for our project
 * @author Kevin Xu
 */
import { createLogger, format, transports, addColors } from 'winston';

const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    http: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green',
    http: 'magenta',
  },
};
/**
 * Format meta into a string object. This may include any number of kwargs that is captured by meta.
 *
 * @param {any} splat raw metta object
 * @returns {string} formatted meta string
 */
const formatSplat = (splat: any): string => {
  // You can format the splat yourself
  if (splat && splat.length) {
    return splat.length === 1 ? JSON.stringify(splat[0]) : JSON.stringify(splat);
  }
  return '';
};

const customFormatWithSplat = format.printf((info) => {
  if (info instanceof Error) {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${
      info.stack
    } ${formatSplat(info.splat)}`;
  }
  return `[${info.timestamp}] ${info.level}\t ${info.label} : ${info.message} ${formatSplat(
    info.splat,
  )}`;
});

const alignColorsAndTime = format.combine(
  format.errors({ stack: true }),
  format.colorize({
    all: true,
  }),
  format.label({
    label: '[LOGGER]',
  }),
  format.timestamp({
    format: 'YY-MM-DD HH:MM:SS',
  }),
  customFormatWithSplat,
);

const logger = createLogger({
  levels: logLevels.levels,
  format: alignColorsAndTime,
  transports: [new transports.Console({})],
});
addColors(logLevels.colors);

export default logger;
