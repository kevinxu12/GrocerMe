/**
 * @file Create a singular backend server
 * @author Kevin Xu
 */
import ClientManager, { ClientManagerType } from './ClientManager';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { port, front_end_url } from './../config';

export type InternalSocketObjType = {
  clientManager: ClientManagerType;
  io: Server;
};

// Server initialization
/**
 * Initialize a singular monolithic socket server for our app
 *
 * @param {Express.Application} app express Application
 * @returns {Function} function that when called, initailizes a socket server
 */
export function initalizeSocket(app: Express.Application) {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: front_end_url,
      methods: ['GET', 'POST'],
    },
  });
  const clientManager = ClientManager();

  io.on('connection', function (client: Socket) {
    console.log('client connected...', client.id);
    // in the future we'll need a client manager like `
    clientManager.addClient(client);
  });

  httpServer.listen(port);
  console.log(`Socket listening to ${port}`);
  return { clientManager, io };
}
