/**
 * @file Create a singular backend server
 * @author Kevin Xu
 */
import ClientManager, { ClientManagerType } from '@src/socket/ClientManager';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { Application } from 'express';
import { port, front_end_dev_cors_url } from '@src/config';
import User from '@src/models/User';
import { logger } from '@src/app';

export type InternalSocketObjType = {
  clientManager: ClientManagerType;
  io: Server;
};

/**
 * Initialize a singular monolithic socket server for our app
 *
 * @param {Application} app express Application
 * @returns {Function} function that when called, initailizes a socket server
 */
export function initalizeSocket(app: Application) {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: front_end_dev_cors_url,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
  const clientManager = ClientManager();

  io.on('connection', function (client: Socket) {
    logger.info('client connected...', client.id);
    // in the future we'll need a client manager like `
    clientManager.addClient(client);

    client.on('login', function (data: User) {
      logger.info('Calling register login');
      clientManager.registerLogin(data, client);
    });
  });

  httpServer.listen(port);
  logger.info(`Socket listening to ${port}`);
  return { clientManager, io };
}
