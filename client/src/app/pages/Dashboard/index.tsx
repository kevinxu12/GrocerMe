/**
 * @file A Home page for logged-in users, both consumers and suppliers
 * @author Kevin Xu
 */
import React, { ComponentType, Dispatch, memo, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import changeUsername, { logout } from 'store/auth/actions';
import { StatusCode } from 'types/rest';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import generateServerUrl from 'utils/url';
import { ChangeUsernameAction, LogoutAction } from 'types/actions';

interface DashboardPropsType {
  changeUsername: (email) => void;
  logout: () => void;
}

/**
 * Generate a dashboard React element. This should be the landing page for a logged-in, non-first-time user
 *
 * @param {object} props props passed
 * @param {Function} props.changeUsername check if logged in, if so store email into redux
 * @param {Function} props.logout logout the user from redux
 * @returns {React.ReactElement} Dashboard Component
 */
const Dashboard = (props: DashboardPropsType): React.ReactElement => {
  const history = useHistory();
  useEffect(() => {
    /**
     * Test function to listen to a socket thats emitted
     */
    async function checkLogin(): Promise<void> {
      const response: AxiosResponse = await axios.get(
        generateServerUrl('/loggedIn'),
        { withCredentials: true },
      );
      const responseBody = response.data;
      if (responseBody.statusCode === StatusCode.SUCCESS) {
        console.log(responseBody);
        if (responseBody.data) {
          props.changeUsername(responseBody.data.email);
        } else {
          props.logout();
          history.push('/');
        }
      }
    }
    checkLogin();
  }, [history, props]);
  return <div>Sample Dashboard</div>;
};

/**
 * Maps dispatch functions to component props
 *
 * @param {Dispatch} dispatch the dispatch object from redux
 * @returns {object} Object passed to props containing redux dispatch functions
 */
function mapDispatchToProps(
  dispatch: Dispatch<ChangeUsernameAction | LogoutAction>,
) {
  return {
    /**
     * Stores email of logged-in user as username in redux
     *
     * @param {string} email the email to set as username
     */
    changeUsername: email => {
      dispatch(changeUsername(email));
    },
    /**
     * Logs out a user if no email returned from redux (session object is expired)
     */
    logout: () => {
      dispatch(logout());
    },
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose<ComponentType>(withConnect, memo)(Dashboard);
