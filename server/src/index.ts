/**
 * @file Main entry point into the backend
 * @author Kevin Xu
 */
import path from 'path';
import app from './fullApp';
import express from 'express';
import { port } from './config';
import logger from './core/logger';

app.use(express.static(path.resolve(__dirname, '../../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});
// because we've removed socket
app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
});

export default app;
