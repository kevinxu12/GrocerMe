/**
 * @file Class combining and exporting all reducers
 * @author Kevin Xu
 */

import { combineReducers } from 'redux';

import { InjectedReducersType } from 'utils/types/injector-typings';
import authReducer from './auth/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

/**
 * @param {object} injectedReducers reducers to inject
 * @returns {object} a combined reducer (between default and injected ones)
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const rootReducer = combineReducers({
    auth: authReducer,
    ...injectedReducers,
  });
  return rootReducer;
}
