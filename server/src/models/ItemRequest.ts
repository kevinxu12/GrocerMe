/**
 * @file Mongoose model for an Item Request
 * In the future, we should have the item request and the supplier request extend off of a generic request interface
 * @author Kevin Xu
 */
import { ItemRequestStatus } from '@src/helpers/model';
import { LocationObject } from '@src/helpers/types';
import mongoose, { model, Schema, Document } from 'mongoose';
import User from './User';

export const DOCUMENT_NAME = 'ItemRequest';
export const COLLECTION_NAME = 'ItemRequest';

export default interface ItemRequest {
  _id?: mongoose.Types.ObjectId;
  requester: User; // we make this optional because it makes testing easier.
  status: ItemRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  email: string;
  amount: number;
  description: string;
  location: LocationObject;
  title: string;
  amountSold: number;
  approvedBy?: string;
  imageUrl?: string;
}

export interface ItemRequestDocument extends Document {
  requester: User; // we make this optional because it makes testing easier.
  status: ItemRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  email: string;
  amount: number;
  description: string;
  location: LocationObject;
  title: string;
  amountSold: number;
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
  location: {
    type: {
      description: { type: String, required: true },
      place_id: { type: String, required: true },
    },
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: {
    type: ItemRequestStatus,
    required: true,
    default: ItemRequestStatus.AWAITING,
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
  amountSold: {
    type: Number,
    required: true,
    default: 0,
  },
});
schema.index({ title: 'text', description: 'text', location: 'text', email: 'text' });
export const ItemRequestModel = model<ItemRequestDocument>(DOCUMENT_NAME, schema, COLLECTION_NAME);
