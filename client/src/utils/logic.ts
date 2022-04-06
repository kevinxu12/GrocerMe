/**
 * @file Helpers for logic
 * TO DO - write tests for logic class
 * @author Kevin Xu
 */
import { ItemRequest } from 'types/rest';
/**
 * Calculates the amount remaining of a given item
 *
 * @param {ItemRequest} data the item request to calculate the amount remaining for
 * @returns {number} the amount remaining
 */
export function calculateAmountRemaining(data: ItemRequest): number {
  const amountSold = data.amountSold ? data.amountSold : 0;
  return data.amount - amountSold;
}

/**
 * Helper to fetch Location Description, with partially non-migrated data
 *
 * @param {ItemRequest} data  the item request to calculate the amount remaining for
 * @returns {string} the location description
 */
export function fetchLocationDescription(data: ItemRequest): string {
  if (typeof data.location === 'object') {
    return data.location.description;
  }
  if (typeof data.location === 'string') {
    return data.location;
  }
  throw new Error('Location is not a string or object');
}
