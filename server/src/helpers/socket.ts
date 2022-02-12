/**
 * @file Helpers for socket
 * @author Kevin Xu
 */

import logger from '@src/core/logger';
import { CustomRequest } from './types';

/**
 * Emit a payload to a specific user's socket client via Express Request.
 *
 * @param {CustomRequest} req the express request object the socket helpers are stored in
 * @param {string} email email to send
 * @param {any} payload payload to emit
 */
export const emitPayloadFromReqToUser = (req: CustomRequest, email: string, payload: any) => {
  const clientManager = req.app.get('clientManager');
  if (!clientManager) {
    logger.info('No initialized socket found');
    return;
  }
  const client = clientManager.getClientByEmail(email);
  if (client) {
    client.emit('accepted supplier request', payload);
  } else {
    logger.warn('Didnt find a client for test route');
  }
};
