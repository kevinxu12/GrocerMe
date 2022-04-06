/**
 * @file New Match class
 * IMPROVE THIS
 * @author Kevin Xu
 */
import { InternalError } from '@src/core/ApiError';
import { SuccessResponse } from '@src/core/ApiResponse';
import asyncHandler from '@src/helpers/asyncHandler';
import ItemMatchRequest from '@src/models/ItemMatchRequest';
import User from '@src/models/User';
import MatchRepo from '@src/repository/MatchRepo';
import express from 'express';
import { Request } from 'express';
import * as Logic from '@src/routes/v1/match/logic';

const router = express.Router();
/**
 * TO DO
 */
router.post(
  '/newItemMatchRequest',
  asyncHandler(async (req, res) => {
    const { itemRequestId, amount } = req.body;
    const requester = req.user as User | undefined;
    if (!requester) {
      throw new InternalError('User not found for some reason');
    }
    const match = await MatchRepo.createNewItemMatchRequest({
      requester: requester,
      itemRequestId: itemRequestId,
      amount,
    });
    if (!match) {
      throw new InternalError('New Item match request created but was not found for some reason');
    }
    return new SuccessResponse<ItemMatchRequest>('Created a new item match request', match).send(
      res,
    );
  }),
);

/**
 * TO DO
 */
router.post(
  '/acceptItemMatchRequest',
  asyncHandler(async (req: Request<unknown, unknown, ItemMatchRequest>, res) => {
    const item = req.body;
    const itemMatchRequest = await Logic.acceptItemMatchRequestLogic(item);
    if (!itemMatchRequest) {
      throw new InternalError('Item match request not found for some reason');
    }
    return new SuccessResponse<ItemMatchRequest>(
      'Accepted item match request, creating a match',
      itemMatchRequest as ItemMatchRequest,
    ).send(res);
  }),
);

/**
 * TO DO
 */
router.get(
  '/itemMatchRequestsForRole',
  asyncHandler(async (req, res) => {
    const itemMatchRequests = await MatchRepo.findItemMatchRequestsByEmail(
      (req.user as User).email,
      req.query,
    );
    if (!itemMatchRequests) {
      throw new InternalError('Item match request not found for some reason');
    }
    return new SuccessResponse<ItemMatchRequest[]>(
      'Fetched all item match requests for a users email',
      itemMatchRequests,
    ).send(res);
  }),
);

/**
 * TO DO
 */
router.get(
  '/itemMatchRequestsForUser',
  asyncHandler(async (req, res) => {
    const itemMatchRequestsSupplier = await MatchRepo.findItemMatchRequestsByEmail(
      (req.user as User).email,
      req.query,
    );
    if (!itemMatchRequestsSupplier) {
      throw new InternalError('Item match requests for supplier email not found for some reason');
    }
    const itemMatchRequestsRequester = await MatchRepo.findItemMatchRequestsByEmail(
      (req.user as User).email,
      req.query,
      false,
    );
    if (!itemMatchRequestsRequester) {
      throw new InternalError('Item match requests for requester email not found for some reason');
    }
    const itemMatchRequests = [
      ...new Set([...itemMatchRequestsRequester, ...itemMatchRequestsSupplier]),
    ];
    return new SuccessResponse<ItemMatchRequest[]>(
      'Fetched all item match requests for a users email',
      itemMatchRequests,
    ).send(res);
  }),
);

router.get(
  '/match',
  asyncHandler(async (req, res) => {
    const match = await MatchRepo.findItemMatchRequestById(req.query.id as any);
    if (match === null) {
      throw new InternalError('For some reason, returned a null item request set');
    }
    return new SuccessResponse<ItemMatchRequest>(
      'Found item match request for this id',
      match as ItemMatchRequest,
    ).send(res);
  }),
);

export default router;
