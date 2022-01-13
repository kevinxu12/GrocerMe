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

/**
 * @returns {React.FC} Frontend App for the project
 */
export function App() {
  const theme = themes.default;
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Switch>
          <PublicRoute exact path={Constants.HOME_URL} component={HomePage} />
          <Route
            exact
            path={Constants.TEST_SOCKET_URL}
            component={TestSocketPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
}
