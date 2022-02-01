
import * as React from 'react';
import { initialState } from 'store/auth/reducer';
import { HomePage } from 'app/pages/Landing';
import PrivateRoute from '..';
import { generateAuthState, MockStoreWrapper } from 'utils/test';
import { RootState } from 'types';
import * as authHelper from 'utils/auth';

jest.mock('utils/auth');
describe('<PrivateRoute  />', () => {
    const mockStoreWrapper = new MockStoreWrapper<RootState>({auth: initialState});
    it('Not logged in user should reroute to the home page', () => {
      const auth = initialState;
      const pr = mockStoreWrapper.renderComponentWithRouterProvider(<PrivateRoute auth = {auth} component = {HomePage} />, {auth});
      expect(pr.container.firstChild).toMatchSnapshot();
      expect(authHelper.isPathAuthenticated).toBeCalledTimes(3); // once on render, once on useEffect, once on re-render
    });

    it('Logged in user should stay at the current page', () => {
      const auth = generateAuthState([]);
      const pr = mockStoreWrapper.renderComponentWithRouterProvider(<PrivateRoute auth = {auth} component = {HomePage} />, {auth});
      expect(pr.container.firstChild).toMatchSnapshot();
      expect(authHelper.isPathAuthenticated).toBeCalledTimes(3);
    });
  });