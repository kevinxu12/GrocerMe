/**
 * @file Route for already loggedin users. If a user is logged in, should redirect to user home page
 * @author Kevin Xu
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RootState } from 'types';
import { Constants } from 'utils/constants';

/**
 * @param {...any} root0 props to pass to component if authenticated
 * @param {React.ElementType} root0.component component to return if authenticated
 * @returns {React.ElementType} either a Redirect or the component passed in props
 */
const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state: RootState) =>
    state ? state.auth.username : true,
  );
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Redirect to={Constants.USER_HOME} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
