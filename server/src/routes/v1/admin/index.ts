/**
 * @file All admin panel results
 * @author Kevin Xu
 */
import { logger } from '@src/app';
import { ForbiddenError, InternalError } from '@src/core/ApiError';
import { SuccessResponse } from '@src/core/ApiResponse';
import asyncHandler from '@src/helpers/asyncHandler';
import SupplierRequest from '@src/models/SupplierRequest';
import User from '@src/models/User';
import AdminRepo from '@src/repository/AdminRepo';
import express from 'express';
import { getErrorMessage } from '../../../../../client/src/utils/errors';

const router = express.Router();

router.get(
  '/allSupplierRequests',
  asyncHandler(async (req, res) => {
    const allRequests = await AdminRepo.findAllSupplierRequests();
    return new SuccessResponse<SupplierRequest[] | null>(
      'Found all supplier requests',
      allRequests as SupplierRequest[],
    ).send(res);
  }),
);

router.get(
  '/supplierRequestForUser',
  asyncHandler(async (req, res) => {
    if (req.session != null && 'supplierRequest' in req.session) {
      const supplierRequest = req.session.supplierRequest;
      return new SuccessResponse<SupplierRequest | null>(
        'Fetched a supplier request for a users email from cache',
        supplierRequest as SupplierRequest,
      ).send(res);
    }
    const supplierRequest = await AdminRepo.findSupplierRequestByEmail((req.user as User).email);
    if (!req.session || !('supplierRequest' in req.session)) {
      logger.info('Caching the supplier request for a user');
      if (!req.session) {
        req.session = {};
      }
      req.session.supplierRequest = supplierRequest; // cache the request session
    }
    return new SuccessResponse<SupplierRequest | null>(
      'Fetched a supplier request for a users email from call',
      supplierRequest as SupplierRequest,
    ).send(res);
  }),
);

/**
 * Creates a new supplier request
 */
router.post(
  '/newSupplierRequest',
  asyncHandler(async (req, res) => {
    if (req.user == null) {
      throw new ForbiddenError('User login expired');
    }
    try {
      const maybeExistingSupplier = await AdminRepo.findSupplierRequestByEmail(
        (req.user as User).email,
      );
      if (maybeExistingSupplier != null) {
        throw new ForbiddenError('Supplier Request already exists');
      }
      const supplierRequest = await AdminRepo.createNewSupplierRequest(req.user as User);
      return new SuccessResponse<SupplierRequest | null>(
        'Created a successful supplier request',
        supplierRequest as SupplierRequest,
      ).send(res);
    } catch (error: unknown) {
      throw new InternalError(getErrorMessage(error));
    }
  }),
);

export default router;
