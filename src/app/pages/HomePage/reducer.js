/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { Constants } from 'utils/constants';
import { CHANGE_USERNAME } from './constants';

// The initial state of the App
// const storagedata = JSON.parse(localStorage.getItem("data"));
export const initialState = {
  username: Constants.DEFAULT_STRING,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        // Delete prefixed '@' from the github username
        draft.username = action.username;
        break;
    }
  });

export default homeReducer;
