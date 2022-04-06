/**
 * @file Logic helpers for the match route
 * @author Kevin Xu
 */

import { InternalError } from '@src/core/ApiError';
import { generateMatchEmailOptions } from '@src/helpers/mail';
import { ItemRequestStatus, RequestStatus } from '@src/helpers/model';
import { sendInternalEmail } from '@src/mail';
import ItemMatchRequest from '@src/models/ItemMatchRequest';
import { ItemRequestModel } from '@src/models/ItemRequest';
import MatchRepo from '@src/repository/MatchRepo';

/**
 * Accept a match request
 *
 * @param {ItemMatchRequest} match - The match to be created
 * @returns {ItemMatchRequest} - The created match
 */
export async function acceptItemMatchRequestLogic(
  match: ItemMatchRequest,
): Promise<ItemMatchRequest | null> {
  if (!match._id) {
    throw new InternalError("For some reason, match doesn't have an id");
  }
  const itemRequest = await ItemRequestModel.findById(match.item);
  if (!itemRequest) {
    throw new InternalError('Item request not found for id, for some reason');
  }
  const updatedItemMatchRequest = await MatchRepo.updateById(match._id, {
    status: RequestStatus.ACCEPTED,
  });

  itemRequest.amountSold = itemRequest.amountSold + match.amount;
  if (itemRequest.amountSold === itemRequest.amount) {
    itemRequest.status = ItemRequestStatus.SOLD;
  }
  itemRequest.save();
  await sendInternalEmail(generateMatchEmailOptions(match));
  return updatedItemMatchRequest;
}
