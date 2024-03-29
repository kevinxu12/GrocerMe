/**
 * @file Route for loggedin users. If a user isn't logged in, should redirect back to landing page
 * @author Kevin Xu
 */
import React, { useState } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { isPathAuthenticated } from 'utils/auth';
import { Constants } from 'utils/constants';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { Wrapper } from '../PrivateWrapper';
import ComponentWithSnackbar from '../SnackbarComponent';

/**
 * @param {...any} root0 props to pass to component if authenticated
 * @param {React.ElementType} root0.component component to return if authenticated
 * @param {AuthState} root0.auth the auth object containing username and roles
 * @returns {React.ElementType} either a Redirect or the component passed in props
 */
const PrivateRoute = ({
  component: Component,
  auth,
  withSnackbar = false,
  ...rest
}): React.ReactElement => {
  const location = useLocation();
  const path = location.pathname;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  useDeepCompareEffect(() => {
    setIsAuthenticated(isPathAuthenticated(path, auth.roles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.roles]);
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          <Wrapper>
            {withSnackbar ? (
              <ComponentWithSnackbar component={Component} {...props} />
            ) : (
              <Component {...props} />
            )}{' '}
          </Wrapper>
        ) : (
          <Redirect to={Constants.HOME_URL} />
        );
      }}
    />
  );
};

export default PrivateRoute;
