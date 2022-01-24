/**
 * @file Test route without middleware
 * @author Kevin Xu
 */
import express from 'express';
import { Socket } from 'socket.io';
import User from '@src/models/User';
import { SuccessMsgResponse } from '@src/core/ApiResponse';
import asyncHandler from '@src/helpers/asyncHandler';
import { ClientManagerType } from '@src/socket/ClientManager';
import { logger } from '@src/app';
const router = express.Router();
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const test_payload = { hi: 'hi' };
    const clientManager: ClientManagerType = req.app.get('clientManager');
    const client: Socket | null = clientManager.getClientByUser(req.user as User | undefined);
    if (client) {
      client.emit('test', test_payload);
      logger.info('Successfully emitted a test payload');
    } else {
      logger.warn('Didnt find a client for test route');
    }
    new SuccessMsgResponse('Test success').send(res);
  }),
);
export default router;
