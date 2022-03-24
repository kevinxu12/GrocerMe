/**
 * @file Key Environment Variables
 * TO DO - some of these variables (in the future) may or should be dynamically calculated. We should figure out a way to clean this up.
 * @author Kevin Xu
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const environment =
  process.env.NODE_ENV || process.env.IS_STAGING || process.env.IS_PROD || 'development';
export const port = process.env.PORT || 'frontend';
export const front_end_dev_cors_url = process.env.FRONT_END_DEV_CORS_URL;
// for now, we have one bucket for testing and staging and production
let image_bucket_name: string = process.env.IMAGES_BUCKET_NAME || 'default';
if (environment === 'test') {
  image_bucket_name = process.env.IMAGES_BUCKET_NAME_TESTING || 'default';
}
export { image_bucket_name };
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

export const google = {
  client_id: process.env.GOOGLE_CLIENT_ID || '',
  client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
  callback_url: process.env.GOOGLE_CALLBACK_URL || '', // this can be calculated in future
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN || '',
  mail_name: process.env.GOOGLE_MAIL_NAME || '',
  mail_password: process.env.GOOGLE_MAIL_PASSWORD || '',
};
