/**
 * @file Testing Navbar component
 * @author Kevin Xu
 */
import * as React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { NavBar } from '..';
import { initialState } from 'store/auth/reducer';

jest.mock('react-i18next', () => ({
  /**
   * @returns an object that mocks react-18next
   */
  useTranslation: () => {
    return {
      /**
       * @param {str} str a string to be translated
       */
      t: str => str,
      i18n: {
        /**
         * @returns object that throws i18n mocked promise
         */
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<Navbar  />', () => {
  const state = { auth: initialState };
  const mockStore = configureStore();
  let store;

  it('should match snapshot', () => {
    store = mockStore(state);
    const loadingIndicator = render(
      <Provider store={store}>
        <NavBar />
      </Provider>,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
