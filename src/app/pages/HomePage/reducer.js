/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_USERNAME } from './constants';

const DUMMY_USERNAME = 'DUMMY';
const DUMMY_TEST = 'TEST';

// The initial state of the App
export const initialState = {
  username: DUMMY_USERNAME,
  test: DUMMY_TEST,
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
