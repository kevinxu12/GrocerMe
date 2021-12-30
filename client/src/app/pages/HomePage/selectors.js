import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.username);

const makeSelectTest = () =>
  createSelector(selectHome, homeState => homeState.test);

export { selectHome, makeSelectUsername, makeSelectTest };
