/**
 * @file Repository class for Roles Model
 * @author Kevin Xu
 */

import Role, { RoleCode, RoleModel } from '@src/models/Role';

/**
 * Route class
 */
export default class RoleRepo {
  /**
   * Create a new role
   *
   * @param {RoleCode} roleCode Role Code to create
   * @returns {Promise} Role that is created or null
   */
  public static async create(roleCode: RoleCode): Promise<Role | null> {
    return await RoleModel.create({ code: roleCode });
  }

  /**
   * find a role based off a role code
   *
   * @param {RoleCode} roleCode Role Code to create
   * @returns {Promise} Role that is created or null
   */
  public static async findByRoleCode(roleCode: RoleCode): Promise<Role | null> {
    return await RoleModel.findOne({ code: roleCode }).lean<Role>().exec();
  }
}
