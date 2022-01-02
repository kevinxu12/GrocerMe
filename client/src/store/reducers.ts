/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import { InjectedReducersType } from 'utils/types/injector-typings';
import authReducer from './auth/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const rootReducer = combineReducers({
    auth: authReducer,
    ...injectedReducers,
  });
  return rootReducer;
}
