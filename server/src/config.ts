// Mapper for environment variables
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

export const db = {
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_USER_PWD || '',
  host_name: process.env.DB_HOST_NAME || '',
};
export const aws = {
  access_key_id: process.env.S3_ACCESS_KEY_ID || '',
  secret_access_key: process.env.S3_SECRET_ACCESS_KEY || '',
};

export const corsUrl = process.env.CORS_URL;
