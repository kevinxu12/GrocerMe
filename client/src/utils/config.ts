/**
 * @file Env constants for the frontend
 */
//if process.env.NODE_ENV != "development"
export const socket_url = process.env.PUBLIC_DEV_URL || 'http://localhost:8000';
