/**
 * @file Admin Repo Mock
 * @author Kevin Xu
 */

import SupplierRequest from '@src/models/SupplierRequest';
import User from '@src/models/User';
import { mockSupplierRequest_1, mockSupplierRequest_2, USER_1_EMAIL, USER_2_EMAIL } from './data';

export const mockFindAllSupplierRequests = jest.fn(async (): Promise<SupplierRequest[] | null> => {
  return null;
});

export const mockFindSupplierRequestByEmail = jest.fn(
  async (email: string): Promise<SupplierRequest | null> => {
    if (email == USER_1_EMAIL) {
      return mockSupplierRequest_1;
    }
    return null;
  },
);

export const mockCreateNewSupplierRequest = jest.fn(
  async (user: User | null): Promise<SupplierRequest | null> => {
    if (user === null) {
      return null;
    }
    if (user.email === USER_1_EMAIL) {
      return mockSupplierRequest_1;
    }
    if (user.email === USER_2_EMAIL) {
      return mockSupplierRequest_2;
    }
    return null;
  },
);

/**
 * Create a mock for Admin Repo
 */
jest.mock('@src/repository/AdminRepo', () => ({
  findAllSupplierRequests: mockFindAllSupplierRequests,
  findSupplierRequestByEmail: mockFindSupplierRequestByEmail,
  createNewSupplierRequest: mockCreateNewSupplierRequest,
}));
