/**
 * @file HomeReducer
 * @author Kevin Xu
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 */

import produce from 'immer';
import { AuthAction, ChangeUsernameAction } from './../../types/actions';
import { AuthState } from './../../types/RootState';
import { Constants } from './../../utils/constants';
import { CHANGE_USERNAME, LOGOUT } from './constants';

// The initial state of the App
export const initialState: AuthState = {
  username: Constants.DEFAULT_STRING,
};

/* eslint-disable default-case, no-param-reassign */
/**
 * @param {object} state Default state of the reducer
 * @param {object} action Action the reducer listens to
 * @returns {object} the new state of the reducer
 */
const authReducer = (
  state: AuthState = initialState,
  action: AuthAction,
): AuthState => {
  return produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        if (!action.payload) {
          break;
        }
        draft.username = (action as ChangeUsernameAction).payload.username;
        break;
      case LOGOUT:
        return initialState;
    }
  });
};

export default authReducer;
