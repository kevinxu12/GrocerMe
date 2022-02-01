
import * as React from 'react';
import { initialState } from 'store/auth/reducer';
import { HomePage } from 'app/pages/Landing';
import PublicRoute from '..';
import { generateAuthState, MockStoreWrapper } from 'utils/test';
import { RootState } from 'types';
import * as authHelper from 'utils/auth';
jest.mock('utils/auth');

describe('<PublicRoute  />', () => {
    const mockStoreWrapper = new MockStoreWrapper<RootState>({auth: initialState});
  
    it('No logged in user should stay at the home page', () => {
      const auth = initialState;
      const pr = mockStoreWrapper.renderComponentWithRouterProvider(<PublicRoute auth = {auth} component = {HomePage} />)
      expect(pr.container.firstChild).toMatchSnapshot();
      expect(authHelper.isRoleCodeIncluded).toBeCalledTimes(1);
    });
    it('Logged in user with admin roles should move to admin', () => {

      const auth = generateAuthState([]);
      const pr = mockStoreWrapper.renderComponentWithRouterProvider(<PublicRoute auth = {auth} component = {HomePage} />, {auth})
      expect(pr.container.firstChild).toMatchSnapshot();
      expect(authHelper.isRoleCodeIncluded).toBeCalledTimes(1);
    });
    it('Logged in user with consuer roles should move to consumer home', () => {
      const auth = generateAuthState([]);
      const pr = mockStoreWrapper.renderComponentWithRouterProvider(<PublicRoute auth = {auth} component = {HomePage} />, {auth})
      expect(pr.container.firstChild).toMatchSnapshot();
      expect(authHelper.isRoleCodeIncluded).toBeCalledTimes(1);
    });
  });