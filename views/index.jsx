import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './components/routes';
import configureStore from './store/configureStore';

const store = configureStore();

const rootElement = document.getElementById('root');
render(
  <Router history={hashHistory} routes={routes} />,
  rootElement
);
