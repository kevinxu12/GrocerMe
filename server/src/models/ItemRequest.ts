/**
 * @file Mongoose model for an Item Request
 * In the future, we should have the item request and the supplier request extend off of a generic request interface
 * @author Kevin Xu
 */
import { RequestStatus } from '@src/helpers/model';
import mongoose, { model, Schema, Document } from 'mongoose';
import User from './User';

export const DOCUMENT_NAME = 'ItemRequest';
export const COLLECTION_NAME = 'ItemRequest';

export default interface ItemRequest {
  _id?: mongoose.Types.ObjectId;
  requester: User; // we make this optional because it makes testing easier.
  status: RequestStatus;
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

export interface ItemRequestDocument extends Document {
  requester: User; // we make this optional because it makes testing easier.
  status: RequestStatus;
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

const schema = new Schema({
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: {
    type: RequestStatus,
    required: true,
    default: RequestStatus.AWAITING,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  approvedBy: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

export const ItemRequestModel = model<ItemRequestDocument>(DOCUMENT_NAME, schema, COLLECTION_NAME);
