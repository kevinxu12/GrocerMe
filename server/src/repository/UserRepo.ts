/**
 * @file A helper client for all things related to the User model. The client is used before all else
 * @author Kevin Xu
 */
import User, { UserModel } from './../models/User';
import { Types } from 'mongoose';
import Role, { RoleCode, RoleModel } from './../models/Role';
import { InternalError } from './../core/ApiError';

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
      .select('+email +roles')
      .populate({
        path: 'roles',
        match: { status: true },
      })
      .lean<User>()
      .exec();
  }
  /**
   * Searches for a Mongoose User within Atlas by their email
   *
   * @param {string} email the email to search for
   * @returns {Promise} user that matches email or null
   */
  public static findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email: email })
      .select('+email +roles')
      .populate({
        path: 'roles',
        match: { status: true },
        select: { code: 1 },
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
        console.log(`Creating a new role with role ${roleCode}`);
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
