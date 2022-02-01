/**
 * @file A private route that also refreshes the login state
 * @author Kevin Xu
 */
import React, { ComponentType, Dispatch, memo, useState } from 'react';
import changeAuth, { logout } from 'store/auth/actions';
import { createStructuredSelector } from 'reselect';
import { Role, User } from 'types/rest';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import { ChangeAuthAction, LogoutAction } from 'types/actions';
import { Wrapper } from 'app/components/PrivateWrapper';
import { useSocket } from 'context/SocketContext';
import { parseAxiosSuccessResponse } from 'utils/request';
import Api from 'utils/api';
import { isPathAuthenticated } from 'utils/auth';
import { Constants } from 'utils/constants';
import { makeSelectRoles, makeSelectUsername } from 'store/auth/selectors';
import useDeepCompareEffect from 'use-deep-compare-effect';

interface RefreshPropsType {
  changeAuth: (email: string, roles?: Role[]) => void;
  logout: () => void;
  component: React.ElementType;
  roles: Role[];
  username: string;
}

/**
 * Generates the refresh route
 *
 * @param {object} props props passed
 * @param {React.ReactElement} props.component the component the wrapper wraps
 * @param {Function} props.changeAuth check if logged in, if so store email into redux
 * @param {Function} props.logout logout the user from redux
 * @param {Role[]} props.roles roles we read from the selector
 * @param {string} props.username username frmo the selector
 * @returns {React.ReactElement} Dashboard Component
 */
export const RefreshPrivateRoute = ({
  component: Component,
  changeAuth,
  logout,
  roles,
  username,
  ...rest
}: RefreshPropsType): React.ReactElement => {
  const history = useHistory();
  const socket = useSocket();
  const location = useLocation();
  const path = location.pathname;
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useDeepCompareEffect(() => {
    /**
     * Test function to listen to a socket thats emitted
     */
    async function checkLogin(): Promise<void> {
      const response = await Api.get('/loggedin');
      const user = parseAxiosSuccessResponse<User>(response);
      if (user === null) {
        logout();
        history.push('/');
        return;
      }
      changeAuth(user.email, user.roles);
      socket.emit('login', user);
      setIsAuthenticated(isPathAuthenticated(path, user.roles));
    }
    checkLogin();
  }, [roles]);

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

/**
 * Maps redux store values to component props
 */
const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  roles: makeSelectRoles(),
});

/**
 * Maps dispatch functions to component props
 *
 * @param {Dispatch} dispatch the dispatch object from redux
 * @returns {object} Object passed to props containing redux dispatch functions
 */
function mapDispatchToProps(
  dispatch: Dispatch<ChangeAuthAction | LogoutAction>,
) {
  return {
    /**
     * Stores info of logged-in user in redux
     *
     * @param {string} email the email of the logged-in user
     * @param {Role[]} roles the optional-roles of the logged-in user
     */
    changeAuth: (email: string, roles?: Role[]) => {
      dispatch(changeAuth({ username: email, roles }));
    },
    /**
     * Logs out a user if no email returned from redux (session object is expired)
     */
    logout: () => {
      dispatch(logout());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose<ComponentType<any>>(
  withConnect,
  memo,
)(RefreshPrivateRoute);
