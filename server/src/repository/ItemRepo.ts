/**
 * @file Repository class for Items Model
 * @author Kevin Xu
 */

import { InternalError } from '@src/core/ApiError';
import { ItemRequestParams } from '@src/helpers/types';
import ItemRequest, { ItemRequestModel } from '@src/models/ItemRequest';
import UserRepo from './UserRepo';

/**
 * Item Class
 */
export default class ItemRepo {
  /**
   * Create a new item
   *
   * @param {ItemRequestParams} itemRequest item to create
   * @returns {Promise} Item that is created or null
   */
  public static async createNewItemRequest(
    itemRequest: ItemRequestParams,
  ): Promise<ItemRequest | null> {
    const { user, title, amount, description } = itemRequest;
    const maybeMatchedUser = await UserRepo.findByEmail(user.email);
    if (maybeMatchedUser === null) {
      throw new InternalError('User doesnt exist in db, but exists in session');
    }
    return await ItemRequestModel.create({
      requester: maybeMatchedUser._id,
      email: user.email,
      amount,
      title,
      description,
    });
  }
}
