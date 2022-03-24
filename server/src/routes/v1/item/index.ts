/**
 * @file Router home page for all item requests
 * @author Kevin Xu
 */
import express, { Request } from 'express';
import asyncHandler from '@src/helpers/asyncHandler';
import User from '@src/models/User';
import ItemRequest from '@src/models/ItemRequest';
import { SuccessResponse } from '@src/core/ApiResponse';
import * as Logic from '@src/routes/v1/item/logic';
import { ItemRequestParams, ItemRequestFilters } from '@src/helpers/types';
import ItemRepo from '@src/repository/ItemRepo';
import { ItemRequestStatus } from '@src/helpers/model';

const router = express.Router();

/**
 * TO DO
 * Should add some middlewares to these
 */
router.get(
  '/allItemRequests',
  asyncHandler(async (req: Request<unknown, unknown, unknown, unknown>, res) => {
    const ItemRequests = await ItemRepo.findAllItemRequests({ status: ItemRequestStatus.AWAITING });
    return new SuccessResponse<ItemRequest[] | null>(
      'Fetched all item requests',
      ItemRequests,
    ).send(res);
  }),
);

/**
 * TO DO
 */
router.post(
  '/acceptItemRequest',
  asyncHandler(async (req: Request<unknown, unknown, ItemRequest>, res) => {
    const item = req.body;
    const itemRequest = await Logic.acceptItemRequestLogic(item);
    return new SuccessResponse<ItemRequest | null>(
      'Created a new item',
      itemRequest as ItemRequest,
    ).send(res);
  }),
);

/**
 * TO DO
 *
 */
router.get(
  '/search',
  asyncHandler(async (req, res) => {
    const itemRequests = await ItemRepo.search(req.query as any);
    return new SuccessResponse<ItemRequest[] | null>(
      'Searched for text',
      itemRequests as ItemRequest[],
    ).send(res);
  }),
);

/**
 * TO DO
 */
router.post(
  '/rejectItemRequest',
  asyncHandler(async (req: Request<unknown, unknown, { _id: string }>, res) => {
    const itemRequest = await ItemRepo.updateById(req.body._id, {
      status: ItemRequestStatus.REJECTED,
    });
    return new SuccessResponse<ItemRequest | null>(
      'Created a new item',
      itemRequest as ItemRequest,
    ).send(res);
  }),
);

/**
 * TO DO
 */
router.get(
  '/itemRequestsForUser',
  asyncHandler(async (req: Request<unknown, unknown, unknown, ItemRequestFilters>, res) => {
    const ItemRequests = await ItemRepo.findItemRequestsByEmail(
      (req.user as User).email,
      req.query,
    );
    return new SuccessResponse<ItemRequest[] | null>(
      'Fetched all item requests for a users email',
      ItemRequests,
    ).send(res);
  }),
);
/**
 * Creates a new item request
 */
router.post(
  '/newItemRequest',
  asyncHandler(async (req: Request<unknown, unknown, ItemRequestParams>, res) => {
    const itemRequest = await Logic.newItemRequest({ ...req.body, user: req.user as User });
    return new SuccessResponse<ItemRequest | null>('Created a new item request', itemRequest).send(
      res,
    );
  }),
);

export default router;
