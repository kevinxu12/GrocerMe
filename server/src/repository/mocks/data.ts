/**
 * @file Mock data for tests
 */
import { RequestStatus } from '@src/helpers/model';
import Role from '@src/models/Role';
import SupplierRequest from '@src/models/SupplierRequest';
import User from '@src/models/User';

export const USER_1_EMAIL = 'random@test.com';
export const USER_1_ID = '';

export const USER_2_EMAIL = 'random2@test.com';
export const USER_2_ID = '';

export const mockUser_1 = {
  _id: USER_1_ID,
  email: USER_1_EMAIL,
  roles: [] as Role[],
} as User;

export const mockUser_2 = {
  _id: USER_2_ID,
  email: USER_2_EMAIL,
  roles: [] as Role[],
} as User;

export const mockSupplierRequest_1 = {
  email: USER_1_EMAIL,
  active: true,
  status: RequestStatus.AWAITING,
} as SupplierRequest;

export const mockSupplierRequest_2 = {
  email: USER_2_EMAIL,
  active: true,
  status: RequestStatus.AWAITING,
} as SupplierRequest;
