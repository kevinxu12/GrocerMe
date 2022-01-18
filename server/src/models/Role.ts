/**
 * @file Mongoose model for 'Role'.
 * @author Kevin Xu
 */
import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Role';
export const COLLECTION_NAME = 'roles';

export enum RoleCode {
  CONSUMER = 'CONSUMER',
  SUPPLIER = 'SUPPLIER',
  ADMIN = 'ADMIN',
}

export default interface Role extends Document {
  code: string;
  status?: boolean;
}

const schema = new Schema(
  {
    code: {
      type: Schema.Types.String,
      required: true,
      enum: [RoleCode.CONSUMER, RoleCode.SUPPLIER, RoleCode.ADMIN],
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
  },
);

export const RoleModel = model<Role>(DOCUMENT_NAME, schema, COLLECTION_NAME);
