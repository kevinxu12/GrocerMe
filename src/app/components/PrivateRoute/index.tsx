import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Constants } from 'utils/constants';
import { RootState } from 'types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state: RootState) =>
    state ? state.home.username : true,
  );
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated !== Constants.DEFAULT_STRING ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
