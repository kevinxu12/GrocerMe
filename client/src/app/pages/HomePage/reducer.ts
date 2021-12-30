/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { HomeAction } from 'types/actions';
import { HomeState } from 'types/RootState';
import { Constants } from 'utils/constants';
import { CHANGE_USERNAME } from './constants';

// The initial state of the App
export const initialState: HomeState = {
  username: Constants.DEFAULT_STRING,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (
  state: HomeState = initialState,
  action: HomeAction,
): HomeState => {
  return produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        draft.username = action.payload.username;
        break;
    }
  });
};

export default homeReducer;
