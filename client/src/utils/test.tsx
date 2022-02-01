/**
 * @file Helper related to unit testing with jest
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { RoleCode } from 'types/rest';
import { Constants } from './constants';
import { AuthState } from 'types/RootState';
/* eslint-disable jsdoc/no-undefined-types */
/**
 * Generates a mock state for our auth reducer
 *
 * @param {RoleCode[]} codes the list of RoleCodes our mock logged in user has
 * @param {string} username the username of our mocked logged in user
 * @returns {AuthState} the mock auth state
 */
export const generateAuthState = (
  codes: RoleCode[],
  username: string = Constants.TEST_USERNAME,
): AuthState => {
  const roles = codes.map((code: RoleCode) => ({ status: true, code }));
  return {
    username: Constants.TEST_USERNAME,
    roles: roles,
  };
};

/**
 * A class that when instantiated, creates a mock provider and store for the entire testing class.
 * All subsequent components rendered with the helper methods access this store
 * Most wrappers will use <T> = <RootState>
 */
export class MockStoreWrapper<T> {
  mockStore: any; // not sure what's the typing here
  state: T; // the store state

  /**
   * Initialize the Mock Store Wrapper
   *
   * @param {T} state The initial state for the store
   */
  constructor(state: T) {
    this.mockStore = configureStore();
    this.state = state;
  }

  /**
   * Create a mock store with an explicit state, default to the state instance variable otherwise
   *
   * @param {T} state an explicit state to keep track of
   * @returns {Store} a mock store that holds the desired state
   */
  public generateStore(state: T = this.state): Store<T> {
    return this.mockStore(state);
  }

  /**
   * Wraps a component with a Provider and Router
   *
   * @param {React.ReactElement} component Component to be wrapped
   * @param {T} state Optional state to create store with
   * @returns {RenderResult} testing library render
   */
  public renderComponentWithRouterProvider(
    component: React.ReactElement,
    state: T = this.state,
  ): RenderResult {
    const store = this.generateStore(state);
    const jsx = (
      <Provider store={store}>
        <Router>{component}</Router>
      </Provider>
    );
    return render(jsx);
  }

  /**
   * Wraps a component with a Provider
   *
   * @param {React.ReactElement} component Component to be wrapped
   * @param {T} state Optional state to create store with
   * @returns {RenderResult} testing library render
   */
  public renderComponentWithProvider(
    component: React.ReactElement,
    state: T = this.state,
  ): RenderResult {
    const store = this.generateStore(state);
    return render(<Provider store={store}>{component}</Provider>);
  }
}

/**
 * Test Component for class
 *
 * @returns {React.ReactElement} Test Component
 */
export const TestComponent = (): React.ReactElement => {
  return <div> Test </div>;
};
