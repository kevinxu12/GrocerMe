/**
 * @file Route for loggedin users. If a user isn't logged in, should redirect back to landing page
 * @author Kevin Xu
 */
import React, { useState } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { isPathAuthenticated } from 'utils/auth';
import { Constants } from 'utils/constants';
import { initialState } from 'store/auth/reducer';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { Wrapper } from '../PrivateWrapper';

/**
 * @param {...any} root0 props to pass to component if authenticated
 * @param {React.ElementType} root0.component component to return if authenticated
 * @param {initialState} root0.auth the auth object containing username and roles
 * @returns {React.ElementType} either a Redirect or the component passed in props
 */
const PrivateRoute = ({
  component: Component,
  auth,
  ...rest
}): React.ReactElement => {
  const location = useLocation();
  const path = location.pathname;
  const [isAuthenticated, setIsAuthenticated] = useState(
    isPathAuthenticated(path, auth.roles),
  );
  useDeepCompareEffect(() => {
    console.log(path);
    setIsAuthenticated(isPathAuthenticated(path, auth.roles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.roles, auth.username]);
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          <Wrapper>
            <Component {...props} />
          </Wrapper>
        ) : (
          <Redirect to={Constants.HOME_URL} />
        );
      }}
    />
  );
};

export default PrivateRoute;
