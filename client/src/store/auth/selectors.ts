/**
 * @file Select specific auth attributes from the redux state for performance purposes
 * @author Kevin Xu
 */
import { createSelector } from 'reselect';
import { AuthState, RootState } from './../../types/RootState';
import { initialState } from './reducer';

/**
 * @param {object} state the Root state
 * @returns {object} the auth state
 */
const selectAuth = (state: RootState): AuthState => state.auth || initialState;

/**
 * Create the createSelector for username attribute
 *
 * @returns {Function} createSelector for username attribute
 */
const makeSelectUsername = () =>
  createSelector(
    selectAuth,
    (authState: AuthState): String => authState.username,
  );

export { selectAuth, makeSelectUsername };
