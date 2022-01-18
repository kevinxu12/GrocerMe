/**
 * @file Mongoose model for a User
 * @author Kevin Xu
 */
import { model, Schema, Document } from 'mongoose';
import Role from './Role';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User extends Document {
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
      select: false, // check what this does
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
      select: false,
    },
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
