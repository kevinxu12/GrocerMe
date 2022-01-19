/**
 * @file HomeReducer
 * @author Kevin Xu
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 */

import produce from 'immer';
import { AuthAction, ChangeAuthAction } from './../../types/actions';
import { AuthState } from './../../types/RootState';
import { Constants } from './../../utils/constants';
import { CHANGE_AUTH, LOGOUT } from './constants';

// The initial state of the App
export const initialState: AuthState = {
  username: Constants.DEFAULT_STRING,
  roles: [],
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
      case CHANGE_AUTH:
        if (!action.payload) {
          break;
        }
        const payload = (action as ChangeAuthAction).payload;
        draft.username = payload.username;
        if (payload.roles) {
          draft.roles = payload.roles;
        }
        console.log(draft);
        break;
      case LOGOUT:
        console.log('Calling logout, clearing state');
        return initialState;
    }
  });
};

export default authReducer;
