/**
 * @file Class configuring the redux store
 * @author Kevin Xu
 */
import { createStore, applyMiddleware, compose, CombinedState } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createReducer } from './reducers';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RootState } from 'types/RootState';

/**
 * @param {object} initialState the initial state of the store. Default to an empty object
 * @returns {object} the redux store for this specific project
 */
export function configureAppStore(initialState = {}) {
  /* eslint-disable */
  let composeEnhancers =
    (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) ||
    compose;
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  // const reducer = storage.reducer(createReducer());
  const rootReducer = createReducer();
  // const engine = createEngine('my-save-key', reviver);
  // const middleware = storage.createMiddleware(engine);
  const middlewares = [sagaMiddleware, thunk]; //middleware];

  const persistConfig = {
    key: 'root',
    storage: storage,
  };

  const pReducer = persistReducer<CombinedState<RootState>, any>(
    persistConfig,
    rootReducer,
  );

  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(
    pReducer,
    initialState,
    composeEnhancers(...enhancers),
  );
  
  return store;
}
