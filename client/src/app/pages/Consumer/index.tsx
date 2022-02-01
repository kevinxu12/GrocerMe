/**
 * @file A Home page for logged-in users, both consumers and suppliers
 * Dashboard is not a private route, because dashboard will refresh periodically to check if the user is still logged in or not.
 * @author Kevin Xu
 */
import React, { ComponentType, Dispatch, memo } from 'react';
import { AxiosResponse } from 'axios';
import changeAuth, { logout } from 'store/auth/actions';
import { Role, User } from 'types/rest';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import { ChangeAuthAction, LogoutAction } from 'types/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectRoles, makeSelectUsername } from 'store/auth/selectors';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { Wrapper } from 'app/components/PrivateWrapper';
import { useSocket } from 'context/SocketContext';
import { Api, parseAxiosSuccessResponse } from 'utils/request';

interface DashboardPropsType {
  changeAuth: (email: string, roles?: Role[]) => void;
  logout: () => void;
  username: string;
  roles: Role[];
}

/**
 * Generate a dashboard React element. This should be the landing page for a logged-in, non-first-time user
 *
 * @param {object} props props passed
 * @param {Function} props.changeAuth check if logged in, if so store email into redux
 * @param {Function} props.logout logout the user from redux
 * @param {string} props.username the username of logged-in user in redux, if this exists
 * @param {Role[]} props.roles the roles of logged-in user in redux, if this exists
 * @returns {React.ReactElement} Dashboard Component
 */
const Dashboard = ({
  changeAuth,
  logout,
  username,
  roles,
}: DashboardPropsType): React.ReactElement => {
  const history = useHistory();
  const socket = useSocket();
  useDeepCompareEffect(() => {
    /**
     * Test function to listen to a socket thats emitted
     */
    async function checkLogin(): Promise<void> {
      const response: AxiosResponse = await Api.get('/loggedin');
      const user = parseAxiosSuccessResponse<User>(response);
      console.log(user);
      if (user == null) {
        logout();
        history.push('/');
        return;
      }
      changeAuth(user.email, user.roles);
      socket.emit('login', user);
    }
    checkLogin();
  }, [username, roles]);
  return <Wrapper>Sample Dashboard</Wrapper>;
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

export default compose<ComponentType>(withConnect, memo)(Dashboard);
