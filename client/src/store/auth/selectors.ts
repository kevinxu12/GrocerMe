import { createSelector } from 'reselect';
import { AuthState, RootState } from './../../types/RootState';
import { initialState } from './reducer';

const selectAuth = (state: RootState): AuthState => state.auth || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectAuth,
    (authState: AuthState): String => authState.username,
  );

export { selectAuth, makeSelectUsername };
