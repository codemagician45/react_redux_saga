import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

import createReducers from './reducers';
import globalSagas from './sagas';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

// const logger = createLogger();


// In order to use the devtools (https://github.com/gaearon/redux-devtools)
// we prepare it to enhance the store.
// const devtools = window.devToolsExtension ? window.devToolsExtension() : (f) => f;


// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

export default function configureStore(initialState, history) {
  const middlewareWithHistory = routerMiddleware(history);
  const middlewares = [
    sagaMiddleware,
    middlewareWithHistory,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const store = createStore(
    createReducers(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  store.runSaga = sagaMiddleware.run(globalSagas);
  store.asyncReducers = {};
  store.asyncSagas = {};

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      require('./reducers').then((reducerModule) => { // eslint-disable-line global-require
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);
        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
