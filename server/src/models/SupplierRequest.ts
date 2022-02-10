/**
 * @file Mongoose model for a User
 * @author Kevin Xu
 */
import { RequestStatus } from '@src/helpers/model';
import mongoose, { model, Schema, Document } from 'mongoose';
import User from './User';

export const DOCUMENT_NAME = 'SupplierRequest';
export const COLLECTION_NAME = 'supplierRequest';

export default interface SupplierRequest {
  _id?: mongoose.Types.ObjectId;
  requester: User; // we make this optional because it makes testing easier.
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  email: string;
  approvedBy?: string;
}

export interface SupplierRequestDocument extends Document {
  requester: User; // we make this optional because it makes testing easier.
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  email: string;
  approvedBy?: string;
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
  approvedBy: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
});

export const SupplierRequestModel = model<SupplierRequestDocument>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME,
);
