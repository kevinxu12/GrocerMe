/**
 * @file Main router handler
 * @author Kevin Xu
 */

import express from 'express';

import test from './test';
import login from './login';
import admin from './admin';
import item from './item';
import images from './images';

const router = express.Router();
router.use('/test', test);
router.use('/', login);
router.use('/', admin);
router.use('/', item);
router.use('/', images);
export default router;
