/**
 * @file Mail helpers
 * @author Kevin Xu
 */

import ItemMatchRequest from '@src/models/ItemMatchRequest';

/**
 * Generate options for an acceptance email for supplie request
 *
 * @param {string} email the email receiving the acceptance message
 * @returns {Object} Options object
 */
export const generateSupplierRequestAcceptanceEmailOptions = (email: string) => ({
  to: email,
  subject: 'Your Supplier Request has been Accepted',
  text: 'Congrats, you are accepted',
});

/**
 * Generate options for a rejection email for supplier request
 *
 * @param {string} email the email receiving the acceptance message
 * @returns {Object} Options object
 */
export const generateSupplierRequestRejectionEmailOptions = (email: string) => ({
  to: email,
  subject: 'Your Supplier Request has been Rejected',
  text: 'You have been rejected by an admin',
});

/**
 * Generates option for an item acceptance email
 *
 * @param {string} email the email receiving the item acceptance message
 * @param {string} title The title of the item request product
 * @returns {Object} Options object
 */
export const generateItemAcceptanceEmailOptions = (email: string, title: string) => ({
  to: email,
  subject: `Your Item Request has been Accepted`,
  text: `Congrats, your request to sell ${title} has been accepted`,
});

/**
 * Generates option for an item request rejection email
 *
 * @param {string} email the email receiving the item rejection message
 * @param {string} title The title of the item request product
 * @returns {Object} Options object
 */
export const generateItemRejectionEmailOptions = (email: string, title: string) => ({
  to: email,
  subject: `Your Item Request has been Rejected`,
  text: `Unfortunately, your request to sell ${title} has been accepted. Please contact support for a reason why`,
});

/**
 * Generates option for a match email
 *
 * @param {ItemMatchRequest} match The match object
 * @returns {Object} Options object
 */
export const generateMatchEmailOptions = (match: ItemMatchRequest) => ({
  to: [match.supplierEmail, match.requesterEmail],
  subject: 'You have a new match!',
  text: `You all have been matched. Please contact ${match.supplierEmail} for more information, but ${match.requesterEmail} requested ${match.amount} amount of ${match.item.title}`,
});
