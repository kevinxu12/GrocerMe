/**
 * @file Logic helper for Items
 * @author Kevin Xu
 */

import { ForbiddenError, InternalError } from '@src/core/ApiError';
import { generateItemAcceptanceEmailOptions } from '@src/helpers/mail';
import { ItemRequestStatus } from '@src/helpers/model';
import { ItemRequestParamsWithUser } from '@src/helpers/types';
import { sendInternalEmail } from '@src/mail';
import ItemRequest from '@src/models/ItemRequest';
import ItemRepo from '@src/repository/ItemRepo';
/**
 * Creates the item request
 * Maybe some middleware or something to prevent duplication with the admin routes class
 * Lot of stale code that we can think about hwo to refactor in the future
 *
 * @param {ItemRequestParamsWithUser} data - The data to create the item request with
 * @returns {Promise} the newly created item request
 */
export async function newItemRequest(data: ItemRequestParamsWithUser): Promise<ItemRequest | null> {
  /** To do */
  if (data.user === null) {
    throw new ForbiddenError('User login expired');
  }
  const itemRequest = await ItemRepo.createNewItemRequest(data);
  return itemRequest;
}

/**
 * Accepts an item request, converting the item request into an item that is available on the public market
 *
 * @param {ItemRequest} request the item request to accept
 * @returns {Promise} the newly accepted item
 */
export async function acceptItemRequestLogic(request: ItemRequest): Promise<ItemRequest | null> {
  if (request._id) {
    const itemRequest = await ItemRepo.updateById(request._id, {
      status: ItemRequestStatus.ACCEPTED,
    });
    // // emitting the socket
    // emitPayloadFromReqToUser(req, requester_email, { roles: newUser.roles });
    // sending the acceptance email
    await sendInternalEmail(generateItemAcceptanceEmailOptions(request.email, request.title));
    return itemRequest;
  }
  throw new InternalError('For some reason, item object missing mongo identifier');
}
