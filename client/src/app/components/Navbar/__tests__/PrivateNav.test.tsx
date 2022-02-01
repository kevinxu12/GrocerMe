/**
 * @file Testing Private Navbar component
 * @author Kevin Xu
 */
import * as React from 'react';
import PrivateNav from './../PrivateNav';
import { Role, RoleCode } from 'types/rest';
import { AuthState, RootState } from 'types/RootState';
import { generateAuthState, MockStoreWrapper } from 'utils/test';
import { initialState } from 'store/auth/reducer';
 describe('<PrivateNav />', () => {
   const mockStoreWrapper = new MockStoreWrapper<RootState>({ auth: initialState} );

 
   it('should match snapshot for private nav for with supplier', () => {
     const state = {auth: generateAuthState([RoleCode.SUPPLIER])};
     const pn = mockStoreWrapper.renderComponentWithRouterProvider(<PrivateNav/>, state);
     expect(pn.container.firstChild).toMatchSnapshot();
   });

   it('should match snapshot for private nav for with admin', () => {
    const state = { auth: generateAuthState([RoleCode.SUPPLIER])};
    const pn = mockStoreWrapper.renderComponentWithRouterProvider(<PrivateNav/>, state);
    expect(pn.container.firstChild).toMatchSnapshot();
  });
 });