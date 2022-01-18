/**
 * @file generate url helpers
 */
import calculated_configs, { environment, API_PREFIX } from './config';

/**
 * Generate the correct backend server url path to call an endpoint, given a relative path
 * i.e if given '/api/hi' generates 'localhost:8080..../api/hi' if in dev
 *
 * @param {string} relative_path the relative path of the api
 * @returns {string} the full string to redirect to
 */
export default function generateServerUrl(relative_path: string): string {
  if (environment === 'development')
    return calculated_configs.server_api_url + relative_path;
  return API_PREFIX + relative_path;
}
