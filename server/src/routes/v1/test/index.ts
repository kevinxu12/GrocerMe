/**
 * @file Test route without middleware
 * @author Kevin Xu
 */
import express from 'express';
import { Socket } from 'socket.io';
import { SuccessMsgResponse } from '../../../core/ApiResponse';
import asyncHandler from '../../../helpers/asyncHandler';

const router = express.Router();
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const test_payload = { hi: 'hi' };
    req.app
      .get('clientManager')
      .getAllClients()
      .map((client: Socket) => {
        client.emit('test', test_payload);
      });
    new SuccessMsgResponse('Test success').send(res);
  }),
);
export default router;
