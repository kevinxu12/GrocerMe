import { ChangeUsernameAction, LogoutAction } from './../../types/actions';
import { CHANGE_USERNAME, LOGOUT } from './constants';
/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export const changeUsername = (username: String): ChangeUsernameAction => ({
  type: CHANGE_USERNAME,
  payload: {
    username,
  },
});

export const logout = (): LogoutAction => {
  return {
    type: LOGOUT,
    payload: {},
  };
};

export default changeUsername;
