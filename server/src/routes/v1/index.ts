/**
 * @file Main router handler
 * @author Kevin Xu
 */

import express from 'express';

import test from './test';
import login from './login';
import admin from './admin';
import item from './item';

const router = express.Router();
router.use('/test', test);
router.use('/', login);
router.use('/', admin);
router.use('/', item);
export default router;
