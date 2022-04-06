/**
 * @file Wrapper around app. This is where we initialize non-express-related services like email, mongo, etc.
 */
import app from './app';
// import { initalizeSocket as initializeSocket, InternalSocketObjType } from '@src/socket';
require('@src/aws/s3');

// skip cause of a issue with jest testing
require('./mail');

// pipe the socket.io and the clientManager into req.app.get('...')
// this isn't the cleanest, but it's kind of the only way I've figured this out to work, because
// We need to pass in app, and I don't want circular dependencies
// const { io, clientManager }: InternalSocketObjType = initializeSocket(app);
// app.set('clientManager', clientManager);
// app.set('io', io);

export default app;
