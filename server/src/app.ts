/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @file Main backend App
 * @author Kevin Xu
 */
// Note that the module alias probably won't work with Jest. We will need relative file paths with Jest.
import 'module-alias/register';
import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { front_end_dev_cors_url } from '@src/config';
import logger from '@src/core/logger';

import routesV1 from '@src/routes/v1';
import { initalizeSocket as initializeSocket, InternalSocketObjType } from '@src/socket';
import passport from 'passport';
import { initializeS3Client } from '@src/aws/s3';
import { connectDb } from './database';
import { createMorgan } from '@src/core/morgan';

// initialize the mongo database
connectDb();
// initialize the S3 client
initializeS3Client();

const app = express();

if (process.env.NODE_ENV !== 'test') {
  require('./mail'); // this should be changed to initializeMailClient()

  // pipe the socket.io and the clientManager into req.app.get('...')
  const { io, clientManager }: InternalSocketObjType = initializeSocket(app);
  app.set('clientManager', clientManager);
  app.set('io', io);
}

// use cookies to store logged in user
app.use(cookieSession({ name: 'google-auth-session', keys: ['key1', 'key2'] }));
app.use(passport.initialize());
app.use(createMorgan(logger));
app.use(passport.session()); // persistent login sessions

app.use(bodyParser.json({ limit: '10mb' })); // add limit to maximum amount of data stored in req.body
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: front_end_dev_cors_url, credentials: true, optionsSuccessStatus: 200 })); // enable cross-origin permissions

// Initiailize Routes
app.use('/api/', routesV1);

export default app;
