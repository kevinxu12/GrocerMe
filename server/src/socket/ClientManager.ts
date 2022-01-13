/**
 * @file Manage All Sockets connected to a given server instance
 * @author Kevin Xu
 */
import { Socket } from 'socket.io';

export type ClientManagerType = {
  addClient: (client: Socket) => void;
  removeClient: (client: Socket) => void;
  getAllClients: () => Socket[];
};

/**
 * The client manager stores all live sockets
 * Every time a user refreshes, they'll be assigned a new socket for now.
 * There is only one socket server.
 *
 * @returns {ClientManager} set of functions
 */
export default function ClientManager() {
  // mapping of all connected socket clients
  const clients = new Map();

  /**
   * Register a socket client into manager
   *
   * @param {Socket} client Socket client being added
   */
  function addClient(client: Socket): void {
    clients.set(client.id, client);
  }

  /**
   * Removes a client from the manager
   *
   * @param {Socket} client Socket client being added
   */
  function removeClient(client: Socket): void {
    clients.delete(client.id);
  }

  /**
   * Get all connected clients
   *
   * @returns {Socket[]} List of clients connected to our current socket
   */
  function getAllClients(): Socket[] {
    return Array.from(clients.values());
  }
  return {
    addClient,
    removeClient,
    getAllClients,
  };
}
