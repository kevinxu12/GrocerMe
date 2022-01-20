/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @file Main backend App
 * @author Kevin Xu
 */
import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { front_end_dev_cors_url } from './config';
import logger from './core/logger';
export { logger };

import routesV1 from './routes/v1';
import { initalizeSocket as initializeSocket, InternalSocketObjType } from './socket';
import passport from 'passport';
import { initializeS3Client } from './aws/s3';
import morgan from './core/morgan';

// initialize the mongo database
require('./database');
// initialize the s3 client
const s3client = initializeS3Client();

const app = express();

// pipe the socket.io and the clientManager into req.app.get('...')
const { io, clientManager }: InternalSocketObjType = initializeSocket(app);
app.set('clientManager', clientManager);
app.set('io', io);

// use cookies to store logged in user
app.use(cookieSession({ name: 'google-auth-session', keys: ['key1', 'key2'] }));
app.use(passport.initialize());
app.use(morgan(logger));
app.use(passport.session()); // persistent login sessions

app.use(bodyParser.json({ limit: '10mb' })); // add limit to maximum amount of data stored in req.body
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: front_end_dev_cors_url, credentials: true, optionsSuccessStatus: 200 })); // enable cross-origin permissions

// Initiailize Routes
app.use('/api/', routesV1);

export default app;
