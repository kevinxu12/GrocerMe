/**
 * @file A helper client for all things related to the User model. The client is used before all else
 * @author Kevin Xu
 */
import User, { UserModel } from '@src/models/User';
import { Types } from 'mongoose';
import Role, { RoleCode, RoleModel } from '@src/models/Role';
import { InternalError } from '@src/core/ApiError';
import { logger } from '@src/app';

/**
 * The User client.
 */
export default class UserRepo {
  /**
   * Searches for a Mongoose User within Atlas by their Mongodb Object Id
   *
   * @param {string} id mongoose id
   * @returns {Promise} Either a User that matches id or null
   */
  public static findById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id })
      .populate({
        path: 'roles',
      })
      .lean<User>()
      .exec();
  }

  /**
   * Updates a user by email
   *
   * @param {string} email email to match and update by
   * @param {any} new_attrs attributes to override
   */
  public static async updateByEmail(email: string, new_attrs: any) {
    await UserModel.findOneAndUpdate(
      { email: email },
      { $set: new_attrs },
      { new: true, runValidators: true },
    );
  }

  /**
   * Searches for a Mongoose User within Atlas by their email
   *
   * @param {string} email the email to search for
   * @returns {Promise} user that matches email or null
   */
  public static findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email: email })
      .populate({
        path: 'roles',
      })
      .lean<User>()
      .exec();
  }
  /**
   * Creates a new user. Populates the user's roles as well with the role corresponding to the roleCode. If the role doesn't exist but is valid, creates the role
   *
   * @param {User} user user to create
   * @param {string} roleCode the code of the role the user is provisioned to
   * @returns {Promise} user that is created
   */
  public static async create(user: User, roleCode: string): Promise<User> {
    const now = new Date();

    let role = await RoleModel.findOne({ code: roleCode }).lean<Role>().exec();
    if (!role) {
      if (roleCode in RoleCode) {
        role = await RoleModel.create({ code: roleCode } as Role);
        logger.info(`Creating a new role with role ${roleCode}`);
      } else {
        throw new InternalError('Role must be defined');
      }
    }

    user.roles = [role._id];
    user.createdAt = user.updatedAt = now;
    const createdUser = await UserModel.create(user);
    return createdUser;
  }
}
