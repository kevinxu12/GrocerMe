
import * as React from 'react';
import { initialState } from 'store/auth/reducer';
import PrivateRoute from '..';
import { generateAuthState, MockStoreWrapper, TestComponent } from 'utils/test';
import { RootState } from 'types';
import { isPathAuthenticated } from 'utils/auth';
import { mount } from 'enzyme';
import { Redirect } from 'react-router-dom';
import SnackbarComponent from 'app/components/SnackbarComponent';

jest.mock('utils/auth', () => ({
  isPathAuthenticated: jest.fn(),
}));
describe('<PrivateRoute  />', () => {
    const mockStoreWrapper = new MockStoreWrapper<RootState>({auth: initialState});
    it('Not logged in user should reroute to the home page', () => {
      (isPathAuthenticated as jest.Mock).mockImplementation(() => false);
      const auth = initialState;
      const jsx = mockStoreWrapper.genComponentWithRouterProvider(<PrivateRoute auth = {auth} component = {TestComponent} />, {auth});
      const res = mount(jsx);
      expect(isPathAuthenticated).toBeCalledTimes(2); // once on render, once on useEffect, once on re-render
      expect(res.find(Redirect).exists()).toBeTruthy();
    });

    it('Logged in user should stay at the current page', () => {
      (isPathAuthenticated as jest.Mock).mockImplementation(() => true);
      const auth = generateAuthState([]);
      const jsx = mockStoreWrapper.genComponentWithRouterProvider(<PrivateRoute auth = {auth} component = {TestComponent} />, {auth});
      const res = mount(jsx);
      expect(res.find(Redirect).exists()).toBeFalsy();
      expect(res.find(TestComponent).exists()).toBeTruthy();
      expect(res.find(SnackbarComponent).exists()).toBeFalsy();
      expect(isPathAuthenticated).toBeCalledTimes(2); // once on render, once on useEffect, once on re-render
    });
    it('Logged in user should show a snackbar component', () => {
      (isPathAuthenticated as jest.Mock).mockImplementation(() => true);
      const auth = generateAuthState([]);
      const jsx = mockStoreWrapper.genComponentWithRouterProvider(<PrivateRoute auth = {auth} component = {TestComponent} withSnackbar={true}/>, {auth});
      const res = mount(jsx);
      expect(res.find(Redirect).exists()).toBeFalsy();
      expect(res.find(TestComponent).exists()).toBeTruthy();
      expect(res.find(SnackbarComponent).exists()).toBeTruthy();
      expect(isPathAuthenticated).toBeCalledTimes(2); // once on render, once on useEffect, once on re-render
    });
  });