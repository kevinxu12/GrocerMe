/**
 * @file Morgan middleware
 * @author Kevin Xu
 */
import morgan, { StreamOptions } from 'morgan';
import { Logger } from 'winston';
import { Morgan } from 'morgan';

/**
 * Initialize a morgan middleware
 *
 * @param {Logger} logger the WinstonLogger that Morgan writes with
 * @returns {Morgan} middleware object
 */
export function createMorgan(logger: Logger) {
  // Override the stream method by telling
  // Morgan to use our custom logger instead of the console.log.
  const stream: StreamOptions = {
    /**
     * Logs the HTTP message to the console
     *
     * @param {string} message message to log
     * @returns {string} logged message
     */
    write: (message) => logger.http(message),
  };

  /**
   * Skip all the Morgan http log if the
  // application is not running in development mode.
   *
   * @returns {boolean} whether to skip or not
   */
  const skip = () => {
    const env = process.env.NODE_ENV || 'development';
    return env !== 'development';
  };

  // Build the morgan middleware
  const morganMiddleware = morgan(
    // Define message format string (this is the default one).
    // The message format is made from tokens, and each token is
    // defined inside the Morgan library.
    // You can create your custom token to show what do you want from a request.
    ':method :url :status :res[content-length] - :response-time ms',
    // Options: in this case, I overwrote the stream and the skip logic.
    // See the methods above.
    { stream, skip },
  );
  return morganMiddleware;
}
