/**
 * @file Item Repository mock
 */
import ItemRequest from '@src/models/ItemRequest';
import User from '@src/models/User';
import { mockItemRequest_1, mockItemRequest_2, USER_1_EMAIL, USER_2_EMAIL } from './data';

export const mockCreateNewItemRequest = jest.fn(
  async (user: User | null): Promise<ItemRequest | null> => {
    if (user === null) {
      return null;
    }
    if (user.email === USER_1_EMAIL) {
      return mockItemRequest_1;
    }
    if (user.email === USER_2_EMAIL) {
      return mockItemRequest_2;
    }
    return null;
  },
);

/**
 * Create a mock for Admin Repo
 */
jest.mock('@src/repository/ItemRepo', () => ({
  createNewItemRequest: mockCreateNewItemRequest,
}));
