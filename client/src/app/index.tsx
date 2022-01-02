/**
 *
 * App
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
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import TestPage from './pages/TestPage';
import { NavBar } from './components/Navbar';

export function App() {
  const theme = themes.default;
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Switch>
          <PublicRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/test" component={TestPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
}
