/**
 * @file Repository class for Items Model
 * @author Kevin Xu
 */

import { InternalError } from '@src/core/ApiError';
import { ItemRequestFilters, ItemRequestParamsWithUser, SearchFilters } from '@src/helpers/types';
import ItemRequest, { ItemRequestModel } from '@src/models/ItemRequest';
import UserRepo from './UserRepo';
import { Types } from 'mongoose';
const DEFAULT_PAGE_SIZE = 10;
/**
 * Item Class
 */
export default class ItemRepo {
  /**
   * Search within the item repo
   *
   * @param {SearchFilters} params the search filters to search by
   * @returns {Promise} The item requests that match the search
   */
  public static async search(params: SearchFilters): Promise<ItemRequest[] | null> {
    console.log(params);
    const { query, pageSize = DEFAULT_PAGE_SIZE, page = 1 } = params;
    return await ItemRequestModel.find({ $text: { $search: query as string } })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .populate({ path: 'requester' })
      .lean<ItemRequest[]>()
      .exec();
  }
  /**
   * Updates an item request
   *
   * @param {Types.ObjectId} _id the mongo id of the item request
   * @param {any} new_attrs Any new attributes to change
   * @returns {Promise} The updated item request
   */
  public static async updateById(_id: Types.ObjectId, new_attrs: any): Promise<ItemRequest | null> {
    return await ItemRequestModel.findOneAndUpdate(
      { _id },
      { $set: new_attrs },
      { new: true, runValidators: true },
    );
  }
  /**
   * Find all item requests that match filters
   *
   * @param {any} attrs Misc. Filters to filter item requests for
   * @returns {Promise} the item requests that match the filters
   */
  public static async findAllItemRequests(attrs: any = {}): Promise<ItemRequest[] | null> {
    return ItemRequestModel.find(attrs)
      .populate({ path: 'requester' })
      .lean<ItemRequest[]>()
      .exec();
  }
  /**
   * Find all item requests by email
   *
   * @param {string} email the email to filter by
   * @param {ItemRequestFilters} filters additional request filters
   * @returns {Promise} the item requests that match the given email
   */
  public static async findItemRequestsByEmail(
    email: string,
    filters: ItemRequestFilters = {},
  ): Promise<ItemRequest[] | null> {
    return ItemRequestModel.find({ email: email, ...filters })
      .populate({ path: 'requester' })
      .lean<ItemRequest[]>()
      .exec();
  }
  /**
   * Create a new item
   *
   * @param {ItemRequestParamsWithUser} itemRequest item to create
   * @returns {Promise} Item that is created or null
   */
  public static async createNewItemRequest(
    itemRequest: ItemRequestParamsWithUser,
  ): Promise<ItemRequest | null> {
    const { user, title, amount, description, location } = itemRequest;
    // this should all be some middleware
    const maybeMatchedUser = await UserRepo.findByEmail(user.email);
    if (maybeMatchedUser === null) {
      throw new InternalError('User doesnt exist in db, but exists in session');
    }
    return await ItemRequestModel.create({
      requester: maybeMatchedUser._id,
      email: user.email,
      amount,
      location,
      title,
      description,
    });
  }
}
