/**
 * @file Mongoose model for a User
 * @author Kevin Xu
 */
import mongoose, { model, Schema, Document } from 'mongoose';
import Role from './Role';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  roles: Role[];
  createdAt?: Date;
  updatedAt?: Date;
  firstTime: boolean;
}
export interface UserDocument extends Document {
  name: string;
  email: string;
  roles: Role[];
  createdAt?: Date;
  updatedAt?: Date;
  firstTime: boolean;
}

const schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      trim: true,
    },
    firstTime: {
      type: Schema.Types.Boolean,
      required: true,
      default: true,
    },
    roles: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Role',
        },
      ],
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
  },
  {
    versionKey: false,
  },
);

export const UserModel = model<UserDocument>(DOCUMENT_NAME, schema, COLLECTION_NAME);
