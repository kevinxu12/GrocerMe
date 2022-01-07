/**
 * @file Route for loggedin users. If a user isn't logged in, should redirect back to landing page
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
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state: RootState) =>
    state ? state.auth.username : Constants.DEFAULT_STRING,
  );
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={Constants.HOME_URL} />
        );
      }}
    />
  );
};

export default PrivateRoute;
