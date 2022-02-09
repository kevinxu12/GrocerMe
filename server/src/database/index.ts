/**
 * @file Connection-related Routes to Mongoose, File initailizes mongoose connection
 * @author Kevin Xu
 */
import mongoose from 'mongoose';
import logger from '@src/core/logger';
import { db } from '@src/config';
/**
 *
 */
export const connectDb = async () => {
  const dbURI = `mongodb+srv://${db.user}:${db.password}@${db.host_name}.vs8ch.mongodb.net/${db.name}?retryWrites=true&w=majority`;
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  };

  logger.debug(dbURI);

  // Create the database connection
  try {
    await mongoose.connect(dbURI, options); // https://github.com/facebook/jest/issues/11665
    logger.info('Mongoose connection done');
  } catch (error) {
    logger.info('Mongoose connection error');
    logger.error(error);
  }

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', () => {
    logger.info('Mongoose default connection open to ' + dbURI);
  });

  // If the connection throws an error
  mongoose.connection.on('error', (err) => {
    logger.error('Mongoose default connection error: ' + err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose default connection disconnected');
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      logger.info('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
};

/**
 *
 */
export const disconnectDb = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};
