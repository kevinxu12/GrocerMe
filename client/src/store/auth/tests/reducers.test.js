import reducer, { initialState } from './../reducer';
// import * as actions from './../actions';
import { CHANGE_AUTH, LOGOUT } from '../constants';

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle CHANGE_AUTH_SUCCESS with just email', () => {
    const test = 'test';
    const changeAuthAction = {
      type: CHANGE_AUTH,
      payload: { username: test },
    };
    expect(reducer({}, changeAuthAction)).toEqual({ username: test });
  });
  it('should handle CHANGE_AUTH_SUCCESS with both email and roles', () => {
    const test = 'test';
    const testRole = {code: "1000", status: true};
    const changeAuthAction = {
      type: CHANGE_AUTH,
      payload: { username: test, roles: [testRole] },
    };
    expect(reducer({}, changeAuthAction)).toEqual({ username: test, roles: [testRole] });
  });
  it('should handle LOGOUT_SUCCESS', () => {
    const logoutAction = {
      type: LOGOUT,
      payload: {},
    };
    expect(reducer({}, logoutAction)).toEqual(initialState);
  });
});
