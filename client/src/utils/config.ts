/**
 * @file Env constants for the frontend
 * @author Kevin Xu
 * TO DO - some of these variables should be dynamically calculated. We should figure out a way to clean this up.
 * For example,
 * - socket_url should depend on the environment i.e (dev, staging, prod). It should point to the backend node.js server, wherever that's hosted depending on the environment
 * - server_url should depend on the environment i.e (dev, staging, prod). ^ See above
 */
export const API_PREFIX = '/api';
export const environment =
  process.env.NODE_ENV ||
  process.env.IS_STAGING ||
  process.env.IS_PROD ||
  'development';

export const socket_url =
  environment === 'development'
    ? process.env.REACT_APP_PUBLIC_SERVER_DEV_URL || 'http://localhost:8080'
    : '/';

const server_url =
  environment === 'development'
    ? process.env.REACT_APP_PUBLIC_SERVER_DEV_URL || ''
    : ''; // by default dev url
console.log(server_url);
console.log(socket_url);
const server_api_url = server_url + API_PREFIX;
const calculated_configs = {
  server_url,
  server_api_url,
};

export default calculated_configs;

export const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
