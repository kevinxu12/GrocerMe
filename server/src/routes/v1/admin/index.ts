/**
 * @file Router class for all routes to be accessed by the admin dashboard
 * TO DO: SupplierRequests should probably be its own folder and not under admin routes
 * @author Kevin Xu
 */
import { SuccessResponse } from '@src/core/ApiResponse';
import asyncHandler from '@src/helpers/asyncHandler';
import SupplierRequest from '@src/models/SupplierRequest';
import User from '@src/models/User';
import AdminRepo from '@src/repository/AdminRepo';
import express from 'express';
import { newSupplierRequest } from './Admin';

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
    // commenting out "caching for now";
    // if ('supplierRequest' in req.session && req.session.supplierRequest) {
    //   const supplierRequest = req.session.supplierRequest;
    //   return new SuccessResponse<SupplierRequest | null>(
    //     'Fetched a supplier request for a users email from cache',
    //     supplierRequest as SupplierRequest,
    //   ).send(res);
    // }
    const supplierRequest = await AdminRepo.findSupplierRequestByEmail((req.user as User).email);
    // if (!('supplierRequest' in req.session && req.session.supplierRequest)) {
    //   logger.info('Caching the supplier request for a user');
    //   if (supplierRequest) {
    //     req.session.supplierRequest = supplierRequest; // cache the request session
    //   }
    // }
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
    const supplierRequest = await newSupplierRequest(req.user as User);
    return new SuccessResponse<SupplierRequest | null>(
      'Created a new supplier request',
      supplierRequest as SupplierRequest,
    ).send(res);
  }),
);

export default router;