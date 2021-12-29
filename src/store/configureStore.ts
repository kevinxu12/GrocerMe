import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { createReducer } from './reducers';
import thunk from 'redux-thunk';

export function configureAppStore(initialState = {}) {
  /* eslint-disable */
  let composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, thunk];

  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  // const reduxSagaMonitorOptions = {};
  // const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  // const { run: runSaga } = sagaMiddleware;

  // // Create the store with saga middleware
  // const middlewares = [sagaMiddleware];

  // const enhancers = [
  //   createInjectorsEnhancer({
  //     createReducer,
  //     runSaga,
  //   }),
  // ] as StoreEnhancer[];

  // const store = configureStore({
  //   reducer: createReducer(),
  //   middleware: [...getDefaultMiddleware(), ...middlewares],
  //   devTools:
  //     /* istanbul ignore next line */
  //     process.env.NODE_ENV !== 'production' ||
  //     process.env.PUBLIC_URL.length > 0,
  //   enhancers,
  // });

  return store;
}
