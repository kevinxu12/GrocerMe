/**
 * @file Backnd types for the types in the REST API. These will probably grow stale as the api's change, so maye we should think of a better way to keep the frontend and backend types synced
 * @author Kevin Xu
 */
export interface Role {
  _id: string;
  status: boolean;
  code: string;
}
export interface User {
  statusCode: string;
  message: string;
  data: {
    _id: string;
    first_time: boolean;
    roles: Role[];
  };
  name: string;
  email: string;
}

export enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003',
}
