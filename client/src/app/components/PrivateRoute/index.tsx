import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RootState } from 'types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state: RootState) =>
    state ? state.auth.username : true,
  );
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
