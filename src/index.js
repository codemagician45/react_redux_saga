// Needed for redux-saga es6 generator support
import 'babel-polyfill';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import './global.css';

import configureStore from './store';

// Import root routes
import routes from './routes';

const initialState = {};
const store = configureStore(initialState);
  
render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('root')
);


// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
  