/**
 * @file Custom Types
 */
import User from '@src/models/User';
import { ItemRequestStatus } from './model';
export interface CustomRequest extends Express.Request {
  app: any; // set to any for now
}

export interface ItemRequestParams {
  description: string;
  amount: number;
  title: string;
  location: string;
  date?: Date | null;
  pictures?: File[];
}
export interface ItemRequestParamsWithUser extends ItemRequestParams {
  user: User;
}

export interface ItemRequestFilters {
  status?: ItemRequestStatus;
}

export interface SearchFilters {
  query: string;
  pageSize?: number;
  page?: number;
}
