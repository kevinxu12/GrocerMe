/**
 * @file Helpers for socket.js
 * @author Kevin Xu
 */
export {}; // empty because socket is bugged right now
// import { io, Socket } from 'socket.io-client';
// import { socket_url } from './config';

// export const socket =
//   io(socket_url, {
//     reconnection: true,
//     reconnectionDelay: 1000,
//     reconnectionDelayMax: 5000,
//     reconnectionAttempts: 5,
//   }) || null;
// console.log(socket);

// /**
//  * For now we don't really need this helper
//  * But if for some reason we don't want to use socket.on(..., handler)
//  * And want 'await socket.on(message)' we can use this
//  *
//  * @param { Socket } socket the socket we are wrapping
//  * @param {string} event socket event message string to listen for
//  * @returns {Promise} data
//  */
// export function SocketAsyncWrapper<T>(
//   socket: Socket | null,
//   event: string,
// ): Promise<T | null> {
//   return new Promise(resolve =>
//     socket ? socket.on(event, (data: T) => resolve(data)) : resolve(null),
//   );
// }

// /**
//  * @param {Socket} socket the socket we are wrapping
//  * @param {string} event Socket event message string to listen for
//  * @param {Function} cb call back when socket is hit
//  */
// export function SocketSyncHandler(socket: Socket | null, event: string, cb) {
//   socket ? socket.on(event, cb) : console.log('No socket object available');
// }
