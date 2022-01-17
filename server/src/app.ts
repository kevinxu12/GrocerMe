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
import routesV1 from './routes/v1';
import { initalizeSocket as initializeSocket, InternalSocketObjType } from './socket';
import passport from 'passport';
import { initializeS3Client } from './aws/s3';

require('./database');
const s3client = initializeS3Client();
import generateClientUrl from './helpers/url';

console.log(generateClientUrl('/dashboard'));
const app = express();
// pipe socket into req.app.io such that we can access it in routes
const { io, clientManager }: InternalSocketObjType = initializeSocket(app);
app.set('clientManager', clientManager);
app.set('io', io);

// required for passport
app.use(cookieSession({ name: 'google-auth-session', keys: ['key1', 'key2'] }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: front_end_dev_cors_url, credentials: true, optionsSuccessStatus: 200 }));

// Routes
app.use('/api/', routesV1);

export default app;
