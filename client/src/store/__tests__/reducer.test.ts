import { createReducer } from '../reducers';
import { Reducer } from '@reduxjs/toolkit';
import { initialState } from 'store/auth/reducer';

describe('reducer', () => {
  it('should inject reducers', () => {
    /**
     * @param s
     * @param a
     */
    const dummyReducer = (s = {}, a) => 'dummyResult';
    const reducer = createReducer({ test: dummyReducer } as any) as Reducer<
      any,
      any
    >;
    const state = reducer({}, '');
    expect(state.test).toBe('dummyResult');
  });

  it('should return identity reducers when empty', () => {
    const reducer = createReducer() as Reducer<any, any>;
    const state = { auth: initialState };
    const newState = reducer(state, '');
    expect(newState).toBe(state);
  });
});
