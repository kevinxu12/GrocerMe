/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import homeReducer from 'app/pages/HomePage/reducer';

import { InjectedReducersType } from 'utils/types/injector-typings';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const rootReducer = combineReducers({
    home: homeReducer,
    ...injectedReducers,
  });
  return rootReducer;
}
