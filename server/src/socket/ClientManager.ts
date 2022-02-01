/**
 * @file Manage All Sockets connected to a given server instance
 * @author Kevin Xu
 */
import { Socket } from 'socket.io';
import User from '@src/models/User';

export type ClientManagerType = {
  addClient: (client: Socket) => void;
  removeClient: (client: Socket) => void;
  getAllClients: () => Socket[];
  registerLogin: (user: User, client: Socket) => void;
  getClientByEmail: (email: string) => Socket | null;
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
  const username_clients = new Map();

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

  /**
   * Registers a user to a client
   *
   * @param {User} user the logged in user
   * @param {Socket} client logged in user's client
   */
  function registerLogin(user: User, client: Socket) {
    const username = user.email; // unique
    username_clients.set(username, client);
  }

  /**
   * Gets a client by user
   *
   * @param {string} email the email to search for
   * @returns {Socket | null} the client corresponding to the user, null if no client or user specified
   */
  function getClientByEmail(email: string) {
    return username_clients.get(email) || null;
  }

  return {
    addClient,
    removeClient,
    getAllClients,
    registerLogin,
    getClientByEmail,
  };
}
