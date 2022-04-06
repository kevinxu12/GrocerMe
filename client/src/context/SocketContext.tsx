/**
 * @file Helper class for all-things related to socket context
 */
export {}; // empty because socket is bugged right now
// import { Socket } from 'socket.io-client';
// import { socket } from 'utils/socket';

// type SocketProviderProps = { children: React.ReactNode };

// const SocketContext = React.createContext<Socket | undefined>(undefined);

// /**
//  * Generate SocketContext Provider
//  *
//  * @param {React.ReactNode} param0 a children the provider wraps
//  * @returns {React.ReactNode} A SocketContext Provider
//  */
// function SocketProvider({ children }: SocketProviderProps) {
//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// }

// /**
//  * Wrapper for useContext for socket. Fetches the stored socket
//  *
//  * @returns {Socket} the socket stored in the context
//  */
// function useSocket() {
//   const context = React.useContext(SocketContext);
//   if (context === undefined) {
//     throw new Error('useSocket must be within a SocketProvider');
//   }
//   return context;
// }

// export { SocketProvider, useSocket };
