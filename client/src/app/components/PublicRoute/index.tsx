/**
 * @file Route for already loggedin users. If a user is logged in, should redirect to user home page
 * @author Kevin Xu
 */
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RoleCode } from 'types/rest';
import { isRoleCodeIncluded } from 'utils/auth';
import { Constants } from 'utils/constants';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { initialState } from 'store/auth/reducer';

/**
 * @param {...any} root0 props to pass to component if authenticated
 * @param {React.ElementType} root0.component component to return if authenticated
 * @param {Object} root0.auth the auth object containing username and roles
 * @returns {React.ElementType} either a Redirect or the component passed in props
 */
const PublicRoute = ({ component: Component, auth, ...rest }) => {
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(
    auth.username !== initialState.username,
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(() =>
    isRoleCodeIncluded(RoleCode.ADMIN, auth.roles),
  );

  useDeepCompareEffect(() => {
    setisAuthenticated(auth.username !== initialState.username);
    setIsAdmin(isRoleCodeIncluded(RoleCode.ADMIN, auth.roles));
  }, [auth.roles, auth.username]);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          isAdmin ? (
            <Redirect to={Constants.ADMIN_HOME} />
          ) : (
            <Redirect to={Constants.USER_HOME} />
          )
        ) : (
          <Component {...rest} />
        )
      }
    />
  );
};

export default PublicRoute;
