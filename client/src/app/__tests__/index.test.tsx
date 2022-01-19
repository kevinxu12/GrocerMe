/**
 * @file Base test for App.tsx file
 * @author Kevin Xu
 */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createRenderer } from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';
import { initialState } from 'store/auth/reducer';

import { App } from '../index';

const renderer = createRenderer();

describe('<App />', () => {
  const mockStore = configureStore();
  let store;

  it('should render and match the snapshot', () => {
    const state = { auth: initialState };
    store = mockStore(state);
    renderer.render(
    <Provider store={store}>
      <App />
    </Provider>,);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
