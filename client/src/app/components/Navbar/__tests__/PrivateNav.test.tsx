/**
 * @file Testing Private Navbar component
 * @author Kevin Xu
 */
 import * as React from 'react';
 import { render } from '@testing-library/react';
 import { Provider } from 'react-redux';
 import configureStore from 'redux-mock-store';
 import PrivateNav from './../PrivateNav';
 import { Role, RoleCode } from 'types/rest';
 import { AuthState } from 'types/RootState';
 
 
 describe('<PrivateNav />', () => {
   const mockStore = configureStore();
   let store;
 
   it('should match snapshot for private nav for with supplier', () => {
     const TEST = 'test';
     const testRole: Role = { status: true, code: RoleCode.SUPPLIER};
     const loggedInState: AuthState = {username: TEST, roles: [testRole]};
     const state = { auth: loggedInState };
     store = mockStore(state);
     const loadingIndicator = render(
       <Provider store={store}>
         <PrivateNav />
       </Provider>,
     );
     expect(loadingIndicator.container.firstChild).toMatchSnapshot();
   });
 });