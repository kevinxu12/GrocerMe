/**
 * @file Generate authentication related helpers
 * @author Kevin Xu
 */

import { Role, RoleCode } from 'types/rest';
import { Constants } from './constants';

export const NO_ROLE_PATHS = [
  Constants.TEST_SOCKET_URL,
  Constants.ABOUT,
  Constants.CONTACT_US,
];
const ALL_ROLE_PATHS = [Constants.SUPPLIER_HOME, Constants.USER_HOME];
const ADMIN_PATHS = [Constants.ADMIN_HOME];
const CONSUMER_PATHS = [
  Constants.ITEM_PURCHASE,
  Constants.MATCH,
  Constants.ALL_MATCHES,
];
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
export const isPathAuthenticated = (
  path: string,
  roles: RoleCode[],
): boolean => {
  // Admin, Supplier
  if (path === Constants.HOME_URL) {
    return true;
  }
  let all_paths = roles.map((role: string) => role_path_object[role]);
  if (roles.length > 0) {
    all_paths = all_paths.concat(ALL_ROLE_PATHS);
  }
  const all_permissioned_paths: string[] = NO_ROLE_PATHS.concat(
    [].concat(...all_paths),
  );
  const unique_all_permissioned_paths = all_permissioned_paths.filter(
    (available_path: string) => path.indexOf(available_path) === 0,
  );
  return unique_all_permissioned_paths.length > 0;
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
  roles: RoleCode[] | null,
): boolean => {
  if (!roles) {
    return false;
  }
  const matching_role = roles.filter((role: RoleCode) => role === roleCode);
  return matching_role.length > 0;
};
