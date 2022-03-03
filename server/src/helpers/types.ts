/**
 * @file Custom Types
 */
import User from '@src/models/User';
export interface CustomRequest extends Express.Request {
  app: any; // set to any for now
}

export interface ItemRequestParams {
  description: string;
  amount: number;
  title: string;
  user: User;
}
