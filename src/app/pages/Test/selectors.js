import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTest = state => initialState;

const makeSelectUsername = () =>
  createSelector(selectTest, homeState => homeState);

export { selectTest, makeSelectUsername };
