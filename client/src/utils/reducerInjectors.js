/**
 * @file File for reducer injectors
 * @author Kevin Xu
 */
import invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';
import { createReducer } from '../store/reducers';

/**
 * A factory which given a store creates an injectReducer function for that store
 *
 * @param {any} store the redux store object to inject into
 * @returns {Function} a function instance that puts a reducer into a key
 */
export function injectReducerFactory(store) {
  return function injectReducer(key, reducer) {
    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    )
      return;

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

/**
 * Creates the injector factory for a given store
 *
 * @param {any} store the redux store object
 * TO DO - this should be typed to the return type of configureStore in the future
 * @returns {object} Returns the injectorReducer for the given store
 */
export default function getInjectors(store) {
  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
