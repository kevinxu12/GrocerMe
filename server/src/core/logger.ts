/**
 * @file Logger for our project
 * @author Kevin Xu
 */
import { createLogger, format, transports, addColors, http } from 'winston';

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
 * @param {any} meta raw metta object
 * @returns {string} formatted meta string
 */
const formatMeta = (meta: any): string => {
  // You can format the splat yourself
  const splat = meta[Symbol.for('splat')];
  if (splat && splat.length) {
    return splat.length === 1 ? JSON.stringify(splat[0]) : JSON.stringify(splat);
  }
  return '';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customFormatWithSplat = format.printf(
  ({ timestamp, level, message, label = '', ...meta }) =>
    `[${timestamp}] ${level}\t ${label} : ${message} ${formatMeta(meta)}`,
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customFormat = format.printf(({ timestamp, level, message, label = '' }) => {
  return `[${timestamp}] ${level}\t ${label} : ${message}`;
});

const alignColorsAndTime = format.combine(
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
  transports: [
    new transports.Console({
      level: 'http',
      format: alignColorsAndTime,
    }),
  ],
});
addColors(logLevels.colors);

export default logger;
