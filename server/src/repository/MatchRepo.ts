/**
 * @file Repository class for Match Model
 * @author Kevin Xu
 */

import { InternalError } from '@src/core/ApiError';
import ItemMatchRequest, { ItemMatchRequestModel } from '@src/models/ItemMatchRequest';
import { ItemRequestModel } from '@src/models/ItemRequest';
import { ItemMatchRequestFilters, MatchParams } from '@src/helpers/types';
import { Types } from 'mongoose';

/**
 * Match Repo Class
 */
export default class MatchRepo {
  /**
   * Creates a new item match request
   *
   * @param {MatchParams} match The match to be created
   * @returns {Promise} The newly created match request
   */
  public static async createNewItemMatchRequest(
    match: MatchParams,
  ): Promise<ItemMatchRequest | null> {
    const { requester, itemRequestId, amount } = match;
    const itemRequest = await ItemRequestModel.findById(itemRequestId);
    if (!itemRequest) {
      throw new InternalError('Item request not found for id, for some reason');
    }
    const amountLeft = itemRequest.amount - itemRequest.amountSold;
    if (amount > amountLeft) {
      throw new InternalError('Amount requested is greater than amount remaining');
    }
    if (requester.email === itemRequest.email) {
      throw new InternalError('You cannot make a match for your own item request');
    }

    const newItemMatchRequest = await ItemMatchRequestModel.create({
      requester: requester._id,
      item: itemRequest._id,
      requesterEmail: requester.email,
      supplierEmail: itemRequest.email,
      amount,
    });
    return newItemMatchRequest;
  }

  /**
   * Find all item match requests by email
   *
   * @param {string} email the email to search by
   * @param {ItemMatchRequestFilters} filters additional request filters
   * @param {boolean} by_supplier whether to filter by supplier or requester
   * @returns {Promise} the item match requests that match the given email
   */
  public static async findItemMatchRequestsByEmail(
    email: string,
    filters: ItemMatchRequestFilters = {},
    by_supplier = true,
  ): Promise<ItemMatchRequest[] | null> {
    const params = by_supplier
      ? { supplierEmail: email, ...filters }
      : { requesterEmail: email, ...filters };
    return ItemMatchRequestModel.find(params)
      .populate({ path: 'requester' })
      .populate({ path: 'item' })
      .lean<ItemMatchRequest[]>()
      .exec();
  }

  /**
   *
   * @param {Types.ObjectId} _id the mongo id of the item match request
   * @param {any} filters any filters to apply
   * @returns {Promise} The item match request that matches or null
   */
  public static async findItemMatchRequestById(
    _id: Types.ObjectId,
    filters: any = {},
  ): Promise<ItemMatchRequest | null> {
    return ItemMatchRequestModel.findOne({ _id, ...filters })
      .populate({ path: 'requester' })
      .populate({ path: 'item' })
      .lean<ItemMatchRequest>()
      .exec();
  }
  /**
   * Updates an item request
   *
   * @param {Types.ObjectId} _id the mongo id of the item match request
   * @param {any} new_attrs Any new attributes to change
   * @returns {Promise} The updated item match request
   */
  public static async updateById(
    _id: Types.ObjectId,
    new_attrs: any,
  ): Promise<ItemMatchRequest | null> {
    return await ItemMatchRequestModel.findOneAndUpdate(
      { _id },
      { $set: new_attrs },
      { new: true, runValidators: true },
    );
  }
}
