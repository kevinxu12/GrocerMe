/**
 * @file For unit testing purposes, Admin logic is abstracted outside of the routing file
 * @author Kevin Xu
 */
import { InternalError } from '@src/core/ApiError';
import { ForbiddenError } from '@src/core/ApiError';
import SupplierRequest from '@src/models/SupplierRequest';
import User from '@src/models/User';
import AdminRepo from '@src/repository/AdminRepo';
import { generateAcceptanceEmailOptions } from '@src/helpers/mail';
// import { emitPayloadFromReqToUser } from '@src/helpers/socket';
import { sendInternalEmail } from '@src/mail';
import { RoleCode } from '@src/models/Role';
import RoleRepo from '@src/repository/RoleRepo';
import UserRepo from '@src/repository/UserRepo';
import { RequestStatus } from '@src/helpers/model';
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

/**
 * Accept a Supplier Request
 * For now the new supplier will need to logout and log back in to see the change.
 * Perhaps a socket here would have been useful.
 *
 * @param {string} requester_email the email to apply logic to
 * @returns {Promise} the modified supplier request
 */
export async function acceptSupplierRequestLogic(
  requester_email: string,
  // req: CustomRequest,
): Promise<SupplierRequest | null> {
  const supplierRequest = await AdminRepo.updateByEmail(requester_email, {
    status: RequestStatus.ACCEPTED,
  });
  const existingUser = await UserRepo.findByEmail(requester_email);
  if (!existingUser) {
    throw new InternalError("For some reason user for the supplier request doesn't exist");
  }
  const adminRole = await RoleRepo.findByRoleCode(RoleCode.ADMIN);
  if (!adminRole) {
    throw new InternalError("For some reason, admin role doesn't exist in db");
  }
  const newUser = await UserRepo.updateByEmail(requester_email, {
    roles: [...existingUser?.roles, adminRole],
  });
  if (!newUser) {
    throw new InternalError('For some reason, update failed and user is not found');
  }
  // // emitting the socket
  // emitPayloadFromReqToUser(req, requester_email, { roles: newUser.roles });
  // sending the acceptance email
  await sendInternalEmail(generateAcceptanceEmailOptions(requester_email));
  return supplierRequest;
}
