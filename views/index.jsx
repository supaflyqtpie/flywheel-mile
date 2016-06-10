import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './components/routes';

const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle

const store = configureStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);

const rootElement = document.getElementById('root');
render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  rootElement
);
