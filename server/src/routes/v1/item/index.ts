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
import { InternalError } from '@src/core/ApiError';

const router = express.Router();

/**
 * TO DO
 * Should add some middlewares to these
 */
router.get(
  '/allItemRequests',
  asyncHandler(async (req: Request<unknown, unknown, unknown, unknown>, res) => {
    const itemRequests = await ItemRepo.findAllItemRequests({ status: ItemRequestStatus.AWAITING });
    if (itemRequests === null) {
      throw new InternalError('For some reason, returned a null item request set');
    }
    return new SuccessResponse<ItemRequest[]>('Fetched all item requests', itemRequests).send(res);
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
    if (itemRequest === null) {
      throw new InternalError('For some reason, returned a null item request set');
    }
    return new SuccessResponse<ItemRequest>(
      'Accepted item request as item to sell',
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
    if (itemRequests === null) {
      throw new InternalError('For some reason, returned a null item request set');
    }
    return new SuccessResponse<ItemRequest[]>(
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
  asyncHandler(async (req: Request<unknown, unknown, ItemRequest>, res) => {
    const item = req.body;
    const itemRequest = await Logic.rejectItemRequestLogic(item);
    if (itemRequest === null) {
      throw new InternalError('For some reason, returned a null item request set');
    }
    return new SuccessResponse<ItemRequest>(
      'Rejected item request as item to sell',
      itemRequest as ItemRequest,
    ).send(res);
  }),
);

router.get(
  '/itemRequest',
  asyncHandler(async (req, res) => {
    const itemRequest = await ItemRepo.findItemRequestById(req.query.id as any);
    if (itemRequest === null) {
      throw new InternalError('For some reason, returned a null item request set');
    }
    return new SuccessResponse<ItemRequest>(
      'Found item request for this object',
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
    const itemRequests = await ItemRepo.findItemRequestsByEmail(
      (req.user as User).email,
      req.query,
    );
    if (itemRequests === null) {
      throw new InternalError('For some reason, returned a null item requests set');
    }
    return new SuccessResponse<ItemRequest[]>(
      'Fetched all item requests for a users email',
      itemRequests,
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
    if (itemRequest === null) {
      throw new InternalError('For some reason, returned a null request');
    }
    return new SuccessResponse<ItemRequest>('Created a new item request', itemRequest).send(res);
  }),
);

export default router;
