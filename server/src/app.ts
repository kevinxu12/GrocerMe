/**
 * @file Main backend App
 * @author Kevin Xu
 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { corsUrl } from './config';
import routesV1 from './routes/v1';

require('./database');
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const s3Client = require('./aws/s3');
const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// Routes
app.use('/api/', routesV1);

export default app;
