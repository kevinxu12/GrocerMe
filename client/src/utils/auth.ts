/**
 * @file Generate authentication related helpers
 * @author Kevin Xu
 */

import { Role, RoleCode } from 'types/rest';
import { Constants } from './constants';

export const NO_ROLE_PATHS = [
  Constants.HOME_URL,
  Constants.TEST_SOCKET_URL,
  Constants.ABOUT,
  Constants.CONTACT_US,
];
const ALL_ROLE_PATHS = [Constants.SUPPLIER_HOME, Constants.USER_HOME];
const ADMIN_PATHS = [Constants.ADMIN_HOME];
const CONSUMER_PATHS = [];
const SUPPLIER_PATHS = [];
const role_path_object = {
  ADMIN: ADMIN_PATHS,
  CONSUMER: CONSUMER_PATHS,
  SUPPLIER: SUPPLIER_PATHS,
};

/**
 * Check if a given set of roles is authenticated for a path
 *
 * @param {string} path the path we want to check authentication for
 * @param {Role[]} roles the roles a user is permissioned to
 * @returns {boolean} whether the path is authenticated depending on the roles
 */
export const isPathAuthenticated = (path: string, roles: Role[]): boolean => {
  const role_codes = roles
    .filter((role: Role) => role.status)
    .map((role: Role) => role.code);
  // Admin, Supplier
  let all_paths = role_codes.map(code => role_path_object[code]);
  if (roles.length > 0) {
    all_paths = all_paths.concat(ALL_ROLE_PATHS);
  }
  const all_available_paths: string[] = NO_ROLE_PATHS.concat(
    [].concat(...all_paths),
  );
  return all_available_paths.includes(path);
};

/**
 * Check if a roleCode is contained within a list of roles
 *
 * @param {RoleCode} roleCode RoleCode that may or may not be included
 * @param {Role[]} roles roles to check within
 * @returns {boolean} true if included, false otherwise
 */
export const isRoleCodeIncluded = (
  roleCode: RoleCode,
  roles: Role[] | null,
): boolean => {
  if (!roles) {
    return false;
  }
  const matching_role = roles.filter((role: Role) => role.code === roleCode);
  return matching_role.length > 0;
};
