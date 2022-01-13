/**
 * @file Socket helpers
 * @author Kevin Xu
 */
import io from 'socket.io-client';
import React from 'react';

const SOCKET_URL = 'http://localhost:8080/';
export const socket = io.connect(SOCKET_URL);
export const SocketContext = React.createContext(null);
/**
 * @param socket
 * @param {string} event socket event message string to listen for
 * @returns {Promise} data
 */
export function SocketAsyncWrapper(socket, event) {
  return new Promise(resolve => socket.on(event, data => resolve(data)));
}
/**
 * @param socket
 * @param {string} event Socket event message string to listen for
 * @param {Function} cb call back when socket is hit
 */
export function SocketSyncHandler(socket, event, cb) {
  socket.on(event, cb);
}
