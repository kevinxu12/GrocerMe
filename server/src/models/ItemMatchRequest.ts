/**
 * @file Mongoose model for an Match Request
 * In the future, we should have the item request, Match Request and the supplier request extend off of a generic request interface
 * @author Kevin Xu
 */
import { RequestStatus } from '@src/helpers/model';
import mongoose, { model, Schema, Document } from 'mongoose';
import ItemRequest from './ItemRequest';
import User from './User';

export const DOCUMENT_NAME = 'MatchRequest';
export const COLLECTION_NAME = 'MatchRequest';

export default interface ItemMatchRequest {
  _id?: mongoose.Types.ObjectId;
  requester: User; // we make this optional because it makes testing easier.
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requesterEmail: string;
  supplierEmail: string;
  item: ItemRequest;
  amount: number;
}

export interface ItemMatchRequestDocument extends Document {
  requester: User; // we make this optional because it makes testing easier.
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requesterEmail: string;
  supplierEmail: string;
  item: ItemRequest;
  amount: number;
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
  amount: {
    type: Number,
    required: true,
  },
  approvedBy: {
    type: String,
    required: false,
  },
  requesterEmail: {
    type: String,
    required: true,
  },
  supplierEmail: {
    type: String,
    required: true,
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'ItemRequest',
    required: true,
  },
});
schema.index({ title: 'text', description: 'text', location: 'text', email: 'text' });
export const ItemMatchRequestModel = model<ItemMatchRequestDocument>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME,
);
