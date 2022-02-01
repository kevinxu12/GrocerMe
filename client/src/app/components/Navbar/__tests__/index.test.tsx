/**
 * @file Testing Navbar component
 * @author Kevin Xu
 */
import * as React from 'react';
import { NavBar } from '..';
import { initialState } from 'store/auth/reducer';
import { MockStoreWrapper } from 'utils/test';
import { RootState } from 'types/RootState';

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
  const mockStoreWrapper = new MockStoreWrapper<RootState>({auth: initialState});
  it('should match snapshot for Navbar', () => {
    const nb = mockStoreWrapper.renderComponentWithProvider(<NavBar/>)
    expect(nb.container.firstChild).toMatchSnapshot();
  });
});
