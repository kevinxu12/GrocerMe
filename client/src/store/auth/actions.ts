/**
 * @file Auth Actions
 * @author Kevin Xu
 */
import { RoleCode } from 'types/rest';
import { ChangeAuthAction, LogoutAction } from './../../types/actions';
import { CHANGE_AUTH, LOGOUT } from './constants';
/**
 * Changes the logged-in user in the reducer
 *
 * @param  {object} props props
 * @param {string} props.username The new email of the logged-in user
 * @param {RoleCode[]} props.roles Te new roles of the logged-in user
 * @returns {object} An action object with a type of CHANGE_AUTH
 */
export const changeAuth = (props: {
  username: string;
  roles?: RoleCode[];
}): ChangeAuthAction => ({
  type: CHANGE_AUTH,
  payload: {
    ...props,
  },
});

/**
 * Logs a user out
 *
 * @returns {object} An action object with type LOGOUT
 */
export const logout = (): LogoutAction => {
  return {
    type: LOGOUT,
    payload: {},
  };
};

export default changeAuth;
