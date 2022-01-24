/**
 * @file generate url helpers
 * @author Kevin Xu
 */
import { environment, front_end_dev_cors_url } from '@src/config';

/**
 * Generate the correct frontend server url path to call an endpoint, given a relative path
 * i.e if given '/api/hi' generates 'localhost:3030..../api/hi' if in dev
 *
 * @param {string} relative_path the relative path of the api
 * @returns {string} the full string to redirect to
 */
export default function generateClientUrl(relative_path: string) {
  // if dev, generate a CORS url
  if (environment === 'staging') return relative_path;
  if (environment === 'development') return front_end_dev_cors_url + relative_path;
  return relative_path;
}
