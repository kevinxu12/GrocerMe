/**
 * @file Main router handler
 * @author Kevin Xu
 */

import express from 'express';

import test from './test';
import login from './login';

const router = express.Router();
router.use('/test', test);
router.use('/', login);
export default router;
