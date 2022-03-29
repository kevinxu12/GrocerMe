/**
 * @file Backend types for the types in the REST API.
 * These will probably grow stale as the api's change, so maye we should think of a better way to keep the frontend and backend types synced
 * @author Kevin Xu
 */
export interface Role {
  _id?: string;
  status: boolean;
  code: string;
}

export interface User {
  _id: string;
  first_time: boolean;
  roles: Role[];
  name: string;
  email: string;
}

export interface SupplierRequest {
  _id: string;
  requester?: User;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  email: string;
  approvedBy?: string;
}

export interface SuccessResponse<T> {
  statusCode: string;
  message: string;
  data: T;
}

export enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003',
}

export enum RoleCode {
  CONSUMER = 'CONSUMER',
  SUPPLIER = 'SUPPLIER',
  ADMIN = 'ADMIN',
}

export enum RequestStatus {
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  AWAITING = 'AWAITING',
}

export enum ItemRequestStatus {
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  AWAITING = 'AWAITING',
  SOLD = 'SOLD',
}
export interface ItemRequest {
  _id: string;
  requester: User; // we make this optional because it makes testing easier.
  status: ItemRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  email: string;
  amount: number;
  description: string;
  title: string;
  approvedBy?: string;
  imageUrl?: string;
}
