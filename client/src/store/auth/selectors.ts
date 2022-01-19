/**
 * @file Select specific auth attributes from the redux state for performance purposes
 * To use the "makeSelectors", I've attached the following example
 * 
 * const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});
 * @author Kevin Xu
 */
import { createSelector } from 'reselect';
import { Role } from 'types/rest';
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

/**
 * Create the createSelector for roles attribute
 *
 * @returns {Function} createSelector for roles attribute
 */
const makeSelectRoles = () =>
  createSelector(selectAuth, (authState: AuthState): Role[] => authState.roles);

export { selectAuth, makeSelectUsername, makeSelectRoles };
