/**
 * @file Repository for all admin helpers
 * @author Kevin Xu
 */

import { InternalError } from '@src/core/ApiError';
import SupplierRequest, { SupplierRequestModel } from '@src/models/SupplierRequest';
import User from '@src/models/User';
import UserRepo from './UserRepo';

/**
 * A helper for all admin routes
 */
export default class AdminRepo {
  /**
   * @param {User} user The user object in the session
   * @returns {Promise} The new supplier request created
   */
  public static async createNewSupplierRequest(user: User): Promise<SupplierRequest | null> {
    // first find a user
    const maybeMatchedUser = await UserRepo.findByEmail(user.email);
    if (maybeMatchedUser == null) {
      throw new InternalError('User doesnt exist in db, but exists in session');
    }
    return await SupplierRequestModel.create({
      requester: maybeMatchedUser._id,
      email: user.email,
    });
  }
  /**
   *
   * @returns {Promise} returns all supplier requests
   */
  public static findAllSupplierRequests(): Promise<SupplierRequest[]> | null {
    return SupplierRequestModel.find()
      .populate({ path: 'requester' })
      .lean<SupplierRequest[]>()
      .exec();
  }

  /**
   * @param {string} email the email to search a request by
   * @returns {Promise} returns a supplier request if matches
   */
  public static findSupplierRequestByEmail(email: string): Promise<SupplierRequest> | null {
    return SupplierRequestModel.findOne({ email: email })
      .populate({ path: 'requester' })
      .lean<SupplierRequest>()
      .exec();
  }
}
