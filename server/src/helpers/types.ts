/**
 * @file Custom Types
 */
import User from '@src/models/User';
import { ItemRequestStatus, RequestStatus } from './model';
import { Types } from 'mongoose';
export interface CustomRequest extends Express.Request {
  app: any; // set to any for now
}

export interface LocationObject {
  description: string;
  place_id: string;
}
export interface ItemRequestParams {
  description: string;
  amount: number;
  title: string;
  location: LocationObject;
  date?: Date | null;
  image?: string | null;
  imageName?: string;
}
export interface ItemRequestParamsWithUser extends ItemRequestParams {
  user: User;
}

export interface ItemRequestFilters {
  status?: ItemRequestStatus;
}

export interface ItemMatchRequestFilters {
  status?: RequestStatus;
}

export interface MatchParams {
  itemRequestId: Types.ObjectId;
  amount: number;
  requester: User;
}

export interface SearchFilters {
  query: string;
  pageSize?: number;
  page?: number;
  additionalParams?: any;
}
