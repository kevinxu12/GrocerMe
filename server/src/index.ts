/**
 * @file Main entry point into the backend
 * @author Kevin Xu
 */
import path from 'path';
import app from './app';
import express from 'express';

app.use(express.static(path.resolve(__dirname, '../../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});
