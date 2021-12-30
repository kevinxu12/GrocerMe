import { createSelector } from 'reselect';
import { HomeState, RootState } from 'types/RootState';
import { initialState } from './reducer';

const selectHome = (state: RootState): HomeState => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    (homeState: HomeState): String => homeState.username,
  );

export { selectHome, makeSelectUsername };
