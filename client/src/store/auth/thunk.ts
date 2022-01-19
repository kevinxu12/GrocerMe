/**
 * @file Thunk helper for auth reducer;
 * @author Kevin Xu
 */
import axios from 'axios';
import { GenericThunkAction } from 'types/actions';
import { timeout } from 'utils/request';
import generateServerUrl from 'utils/url';
import { logout } from './actions';

/**
 * Generate asynchronous dispatch function
 *
 * @returns {GenericThunkAction} Function that runs an asynchronous dispatch
 */
export const logoutWithThunk = (): GenericThunkAction => async dispatch => {
  const response = await axios.get(generateServerUrl('/logout'), {
    withCredentials: true,
  });
  console.log(response);
  timeout(100);
  dispatch(logout());
};
