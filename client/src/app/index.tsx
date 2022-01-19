/**
 *
 * @file App
 * @author Kevin Xu
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './../styles/global-styles';
import { themes } from './../styles/themes/themes';
import { HomePage } from './pages/HomePage/loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import PublicRoute from './components/PublicRoute';
import TestSocketPage from './pages/TestSocketPage';
import { NavBar } from './components/Navbar';
import { Constants } from 'utils/constants';
import { Dashboard } from './pages/Dashboard/loadable';
import { useSelector } from 'react-redux';
import { RootState } from 'types';
import PrivateRoute from './components/PrivateRoute';

/**
 * @returns {React.ReactElement} Frontend App for the project
 */
export function App() {
  const theme = themes.default;
  const auth = {
    username: useSelector((state: RootState) => state.auth.username),
    roles: useSelector((state: RootState) => state.auth.roles),
  };
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Switch>
          <PublicRoute
            auth={auth}
            exact
            path={Constants.HOME_URL}
            component={HomePage}
          />
          <PrivateRoute
            auth={auth}
            exact
            path={Constants.TEST_SOCKET_URL}
            component={TestSocketPage}
          />
          <Route exact path={Constants.USER_HOME} component={Dashboard} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
}
