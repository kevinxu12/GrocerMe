
import * as React from 'react';
import { initialState } from 'store/auth/reducer';
import { MockStoreWrapper, TestComponent } from 'utils/test';
import { RootState } from 'types';
import { RefreshPrivateRoute } from '..';
import { parseAxiosSuccessResponse } from 'utils/request';
import axios from 'axios';
import { render, waitFor } from '@testing-library/react';

jest.mock('axios');
jest.mock('utils/request', () => ({
    __esModule: true,
    parseAxiosSuccessResponse: jest.fn(),
  }))
jest.mock('context/SocketContext', () => ({
    __esModule: true,
    useSocket: () => ({
        emit: jest.fn()
    })
  }))
const changeAuthMock = jest.fn();
const logoutMock = jest.fn();

describe('<RefreshPrivateRoute  />', () => {
    const mockStoreWrapper = new MockStoreWrapper<RootState>({auth: initialState});
    it('Logged in user should see state update', async () => {
      const auth = initialState;
      (axios.get as jest.Mock).mockImplementation(() => null);
      (parseAxiosSuccessResponse as jest.Mock).mockImplementation(() => ({username: 'hi', roles: []}));
      const pr = mockStoreWrapper.renderComponentWithRouterProvider(<RefreshPrivateRoute roles={[]} username={"hi"} changeAuth={changeAuthMock} logout={logoutMock} component={TestComponent}/>);
      expect(pr.container.firstChild).toMatchSnapshot();
      expect(axios.get).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(parseAxiosSuccessResponse).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(changeAuthMock).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(logoutMock).toHaveBeenCalledTimes(0));
    });
    it('No Logged in user should return nearly', async () => {
      const auth = initialState;
      (axios.get as jest.Mock).mockImplementation(() => null);
      (parseAxiosSuccessResponse as jest.Mock).mockImplementation(() => null);
      const pr = mockStoreWrapper.renderComponentWithRouterProvider(<RefreshPrivateRoute roles={[]} username={"hi"} changeAuth={changeAuthMock} logout={logoutMock} component={TestComponent}/>);
      expect(pr.container.firstChild).toMatchSnapshot();
      expect(axios.get).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(parseAxiosSuccessResponse).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(logoutMock).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(changeAuthMock).toHaveBeenCalledTimes(0));
    });
  });