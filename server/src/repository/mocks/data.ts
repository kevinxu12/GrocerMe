/**
 * @file Mock data used in unit, db, and integration tests
 * @author Kevin Xu
 */
import { RequestStatus } from '@src/helpers/model';
import Role, { RoleCode } from '@src/models/Role';
import SupplierRequest from '@src/models/SupplierRequest';
import User from '@src/models/User';
import mongoose from 'mongoose';

export const USER_1_EMAIL = 'random@test.com';
export const USER_1_ID = new mongoose.Types.ObjectId();
export const USER_1_NAME = 'test';
const date = new Date('2022-02-09T00:02:52.556Z');
export const USER_2_EMAIL = 'random2@test.com';
export const USER_2_ID = new mongoose.Types.ObjectId();
export const USER_2_NAME = 'test';

export const SUPPLIER_REQUEST_1_ID = USER_1_ID;
export const SUPPLIER_REQUEST_2_ID = USER_1_ID;

export const INJECTED_USER_EMAIL = 'test';
export const INJECTED_USER_ID = new mongoose.Types.ObjectId();
export const INJECTED_USER_NAME = 'test';

export const mockAdminRole = {
  code: RoleCode.ADMIN,
} as Role;
export const mockUser_1 = {
  _id: USER_1_ID,
  email: USER_1_EMAIL,
  roles: [] as Role[],
  name: USER_1_NAME,
  firstTime: true,
  createdAt: date,
  updatedAt: date,
} as User;

export const mockUser_2 = {
  _id: USER_2_ID,
  email: USER_2_EMAIL,
  roles: [] as Role[],
  name: USER_2_NAME,
  firstTime: true,
  createdAt: date,
  updatedAt: date,
} as User;

export const injectedUser = {
  _id: INJECTED_USER_ID,
  email: INJECTED_USER_EMAIL,
  name: INJECTED_USER_NAME,
  roles: [],
  firstTime: true,
  createdAt: date,
  updatedAt: date,
};

export const mockSupplierRequest_1 = {
  _id: SUPPLIER_REQUEST_1_ID,
  email: USER_1_EMAIL,
  active: true,
  requester: mockUser_1,
  status: RequestStatus.AWAITING,
  createdAt: date,
  updatedAt: date,
} as SupplierRequest;

export const mockSupplierRequest_1_with_populate = {
  _id: SUPPLIER_REQUEST_1_ID,
  email: USER_1_EMAIL,
  active: true,
  requester: mockUser_1,
  status: RequestStatus.AWAITING,
  createdAt: date,
  updatedAt: date,
};

export const mockSupplierRequest_2 = {
  _id: SUPPLIER_REQUEST_2_ID,
  email: USER_2_EMAIL,
  active: true,
  requester: mockUser_2,
  status: RequestStatus.AWAITING,
  createdAt: date,
  updatedAt: date,
} as SupplierRequest;
