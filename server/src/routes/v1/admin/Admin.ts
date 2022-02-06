/**
 * @file For unit testing purposes, Admin logic is abstracted outside of the routing file
 * @author Kevin Xu
 */
import { ForbiddenError } from '@src/core/ApiError';
import SupplierRequest from '@src/models/SupplierRequest';
import User from '@src/models/User';
import AdminRepo from '@src/repository/AdminRepo';

/**
 * Makes a new supplier request for a user
 *
 * @param {User | null} user the user to make a new SupplierRequest for
 * @returns {Promise} Optional, the new request that's been made
 */
export async function newSupplierRequest(user: User | null): Promise<SupplierRequest | null> {
  if (user == null) {
    throw new ForbiddenError('User login expired');
  }
  const maybeExistingSupplier = await AdminRepo.findSupplierRequestByEmail((user as User).email);
  if (maybeExistingSupplier != null) {
    throw new ForbiddenError('Supplier Request already exists');
  }
  const supplierRequest = await AdminRepo.createNewSupplierRequest(user as User);
  return supplierRequest;
}
