/**
 * @file Helper class for all-things related to socket context
 */
import * as React from 'react';
import { Socket } from 'socket.io-client';
import { socket } from 'utils/socket';

type SocketProviderProps = { children: React.ReactNode };

const SocketContext = React.createContext<Socket | undefined>(undefined);

/**
 * Generate SocketContext Provider
 *
 * @param {React.ReactNode} param0 a children the provider wraps
 * @returns {React.ReactNode} A SocketContext Provider
 */
function SocketProvider({ children }: SocketProviderProps) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

/**
 * Wrapper for useContext for socket
 */
function useSocket() {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be within a SocketProvider');
  }
}

export { SocketProvider, useSocket };
