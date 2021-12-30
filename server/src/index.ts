import path from 'path';
import { port } from './config';
import app from './app';
import express from 'express';

app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});
