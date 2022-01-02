import { createStore, applyMiddleware, compose, CombinedState } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import createEngine from 'redux-storage-engine-localstorage';
import { createReducer } from './reducers';
import thunk from 'redux-thunk';
// import { reviver } from './localstorage';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RootState } from 'types/RootState';

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

  // const load = storage.createLoader(engine);
  // load(store);

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
