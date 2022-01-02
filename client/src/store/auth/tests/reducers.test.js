import reducer, { initialState } from './../reducer';
// import * as actions from './../actions';
import { CHANGE_USERNAME, LOGOUT } from '../constants';

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle CHANGE_USERNAME_SUCCESS', () => {
    const test = 'test';
    const changeUsernameAction = {
      type: CHANGE_USERNAME,
      payload: { username: test },
    };
    expect(reducer({}, changeUsernameAction)).toEqual({ username: test });
  });
  it('should handle LOGOUT_SUCCESS', () => {
    const logoutAction = {
      type: LOGOUT,
      payload: {},
    };
    expect(reducer({}, logoutAction)).toEqual(initialState);
  });
});
