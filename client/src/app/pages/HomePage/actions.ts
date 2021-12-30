import { HomeAction } from 'types/actions';
import { CHANGE_USERNAME } from './constants';
/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
const changeUsername = (username: String): HomeAction => ({
  type: CHANGE_USERNAME,
  payload: {
    username,
  },
});

export default changeUsername;
