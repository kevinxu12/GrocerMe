/**
 *
 *
 * @file This is the entry file for the application, only setup and boilerplate
 * code.
 * @author Kevin Xu
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Use consistent styling
import 'sanitize.css/sanitize.css';

// Import root app
import { App } from 'app';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';
import { HelmetProvider } from 'react-helmet-async';
import { configureAppStore } from 'store/configureStore';

// Initialize languages
import './locales/i18n';
// import { SocketProvider } from 'context/SocketContext';

const store = configureAppStore();
const persistor = persistStore(store);
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    {/* <SocketProvider> */}
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </HelmetProvider>
    </PersistGate>
    {/* </SocketProvider> */}
  </Provider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}
