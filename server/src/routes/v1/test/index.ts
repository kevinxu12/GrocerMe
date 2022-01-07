/**
 * @file Test route without middleware
 * @author Kevin Xu
 */
import express from 'express';
import { SuccessMsgResponse } from '../../../core/ApiResponse';
import asyncHandler from '../../../helpers/asyncHandler';

const router = express.Router();
router.get(
  '/',
  asyncHandler(async (req, res) => {
    new SuccessMsgResponse('Test success').send(res);
  }),
);
export default router;
